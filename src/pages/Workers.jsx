import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import WorkerCard from '../components/workers/WorkerCard';
import WorkerFilters from '../components/workers/WorkerFilters';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3X3, List, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Workers() {
  const { t, language } = useLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  
  const [searchQuery, setSearchQuery] = useState(urlParams.get('q') || '');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({
    category: urlParams.get('category') || '',
    city: urlParams.get('location') || '',
    commune: '',
    minRating: 0,
    verifiedOnly: false,
    availableOnly: false,
  });

  const { data: workers = [], isLoading } = useQuery({
    queryKey: ['workers', filters, searchQuery, sortBy],
    queryFn: async () => {
      const query = {};
      if (filters.category) query.skills = filters.category;
      if (filters.city) query.city = filters.city;
      if (filters.commune) query.commune = filters.commune;
      if (filters.verifiedOnly) query.is_verified = true;
      if (filters.availableOnly) query.availability = 'available';
      query.status = 'active';
      
      let sortField = '-rating_average';
      if (sortBy === 'jobs') sortField = '-jobs_completed';
      if (sortBy === 'response') sortField = 'response_time_hours';
      if (sortBy === 'newest') sortField = '-created_date';
      
      const result = await base44.entities.Worker.filter(query, sortField, 50);
      
      // Filter by minimum rating and search query locally
      return result.filter(worker => {
        if (filters.minRating && (worker.rating_average || 0) < filters.minRating) return false;
        if (searchQuery) {
          const search = searchQuery.toLowerCase();
          const nameMatch = worker.full_name?.toLowerCase().includes(search);
          const skillsMatch = worker.skills?.some(s => s.toLowerCase().includes(search));
          const bioMatch = worker.bio?.toLowerCase().includes(search);
          if (!nameMatch && !skillsMatch && !bioMatch) return false;
        }
        return true;
      });
    },
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      city: '',
      commune: '',
      minRating: 0,
      verifiedOnly: false,
      availableOnly: false,
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('nav.workers')}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' 
              ? `${workers.length} ouvriers trouvés`
              : `${workers.length} workers found`
            }
          </p>
          
          {/* Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={t('home.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-gray-200"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">
                    {language === 'fr' ? 'Mieux notés' : 'Top Rated'}
                  </SelectItem>
                  <SelectItem value="jobs">
                    {language === 'fr' ? 'Plus d\'expérience' : 'Most Experience'}
                  </SelectItem>
                  <SelectItem value="response">
                    {language === 'fr' ? 'Réponse rapide' : 'Fast Response'}
                  </SelectItem>
                  <SelectItem value="newest">
                    {language === 'fr' ? 'Nouveaux' : 'Newest'}
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <div className="hidden sm:flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <WorkerFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          {/* Workers Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <WorkerFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : workers.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('common.noResults')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'fr' 
                    ? 'Essayez de modifier vos critères de recherche'
                    : 'Try adjusting your search criteria'
                  }
                </p>
                <Button variant="outline" onClick={handleResetFilters}>
                  {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset Filters'}
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === 'grid'
                      ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {workers.map((worker, index) => (
                    <motion.div
                      key={worker.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <WorkerCard
                        worker={worker}
                        variant={viewMode === 'list' ? 'compact' : 'default'}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}