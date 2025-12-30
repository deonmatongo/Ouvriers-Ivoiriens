import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, MapPin, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample featured workers
const featuredWorkers = [
  {
    id: '1',
    full_name: 'Kouamé Jean',
    profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    skills: ['Plomberie', 'Installation sanitaire'],
    city: 'Abidjan',
    commune: 'Cocody',
    rating_average: 4.9,
    rating_count: 127,
    is_verified: true,
    experience_years: 8,
    jobs_completed: 234,
    response_time_hours: 1,
  },
  {
    id: '2',
    full_name: 'Coulibaly Ibrahim',
    profile_photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    skills: ['Électricité', 'Domotique'],
    city: 'Abidjan',
    commune: 'Plateau',
    rating_average: 4.8,
    rating_count: 98,
    is_verified: true,
    experience_years: 12,
    jobs_completed: 312,
    response_time_hours: 2,
  },
  {
    id: '3',
    full_name: 'Yao Patricia',
    profile_photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    skills: ['Peinture', 'Décoration'],
    city: 'Abidjan',
    commune: 'Marcory',
    rating_average: 4.9,
    rating_count: 156,
    is_verified: true,
    experience_years: 6,
    jobs_completed: 189,
    response_time_hours: 1,
  },
  {
    id: '4',
    full_name: 'Traoré Moussa',
    profile_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    skills: ['Menuiserie', 'Ébénisterie'],
    city: 'Abidjan',
    commune: 'Yopougon',
    rating_average: 4.7,
    rating_count: 84,
    is_verified: true,
    experience_years: 15,
    jobs_completed: 421,
    response_time_hours: 3,
  },
];

export default function FeaturedWorkers() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t('home.featuredWorkers')}
            </h2>
            <p className="text-gray-600 mt-2">
              {language === 'fr' 
                ? 'Découvrez nos meilleurs professionnels'
                : 'Discover our top professionals'
              }
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
            asChild
          >
            <Link to={createPageUrl('Workers')}>
              {t('home.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Workers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorkers.map((worker, index) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`${createPageUrl('WorkerProfile')}?id=${worker.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={worker.profile_photo}
                      alt={worker.full_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {worker.is_verified && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-xs font-medium text-gray-700">{t('worker.verified')}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-500 transition-colors">
                      {worker.full_name}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{worker.commune}, {worker.city}</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {worker.skills.slice(0, 2).map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{worker.rating_average}</span>
                        <span className="text-gray-400 text-sm">({worker.rating_count})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="h-3.5 w-3.5" />
                        <span>~{worker.response_time_hours}h</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}