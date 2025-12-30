import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    navigate(`${createPageUrl('Workers')}?${params.toString()}`);
  };

  const stats = [
    { value: '5,000+', label: 'Ouvriers qualifiés' },
    { value: '50,000+', label: 'Travaux réalisés' },
    { value: '4.8/5', label: 'Note moyenne' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-40 w-64 h-64 bg-orange-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              La plateforme #1 en Côte d'Ivoire
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('home.heroTitle')}
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
              {t('home.heroSubtitle')}
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="flex-1 flex items-center gap-2 px-4">
                  <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder={t('home.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 px-0 text-base"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 px-4 border-t sm:border-t-0 sm:border-l border-gray-200">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder={t('home.locationPlaceholder')}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-0 focus-visible:ring-0 px-0 text-base"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-xl"
                >
                  {t('home.searchButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {['Ouvriers vérifiés', 'Devis gratuits', 'Paiement sécurisé'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
                alt="Artisan at work"
                className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Travail terminé !</p>
                    <p className="text-sm text-gray-500">Installation plomberie</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white rounded-2xl px-4 py-2 shadow-lg">
                <span className="text-2xl font-bold">4.8</span>
                <span className="text-sm opacity-90">/5 ⭐</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 lg:mt-24 grid grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm sm:text-base text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}