import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../components/i18n/LanguageContext';
import { Card } from "@/components/ui/card";
import { 
  Wrench, 
  Zap, 
  Hammer, 
  PaintBucket, 
  Blocks, 
  Sparkles, 
  TreePine, 
  Fan, 
  Home,
  Construction,
  Flame,
  PackageOpen,
  Scissors,
  Car,
  Utensils,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const allCategories = [
  { 
    slug: 'plumbing', 
    icon: Wrench, 
    color: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    count: 234 
  },
  { 
    slug: 'electrical', 
    icon: Zap, 
    color: 'from-yellow-500 to-orange-500',
    bgLight: 'bg-yellow-50',
    count: 189 
  },
  { 
    slug: 'carpentry', 
    icon: Hammer, 
    color: 'from-amber-600 to-amber-700',
    bgLight: 'bg-amber-50',
    count: 156 
  },
  { 
    slug: 'painting', 
    icon: PaintBucket, 
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50',
    count: 203 
  },
  { 
    slug: 'masonry', 
    icon: Blocks, 
    color: 'from-gray-600 to-gray-700',
    bgLight: 'bg-gray-100',
    count: 145 
  },
  { 
    slug: 'cleaning', 
    icon: Sparkles, 
    color: 'from-green-500 to-green-600',
    bgLight: 'bg-green-50',
    count: 312 
  },
  { 
    slug: 'gardening', 
    icon: TreePine, 
    color: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    count: 98 
  },
  { 
    slug: 'airConditioning', 
    icon: Fan, 
    color: 'from-cyan-500 to-cyan-600',
    bgLight: 'bg-cyan-50',
    count: 167 
  },
  { 
    slug: 'roofing', 
    icon: Home, 
    color: 'from-red-500 to-red-600',
    bgLight: 'bg-red-50',
    count: 78 
  },
  { 
    slug: 'welding', 
    icon: Flame, 
    color: 'from-orange-600 to-red-600',
    bgLight: 'bg-orange-50',
    count: 112 
  },
  { 
    slug: 'tiling', 
    icon: Construction, 
    color: 'from-indigo-500 to-indigo-600',
    bgLight: 'bg-indigo-50',
    count: 134 
  },
  { 
    slug: 'moving', 
    icon: PackageOpen, 
    color: 'from-pink-500 to-pink-600',
    bgLight: 'bg-pink-50',
    count: 89 
  },
];

export default function Categories() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            {t('nav.categories')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-orange-100 max-w-2xl mx-auto"
          >
            {language === 'fr'
              ? 'Découvrez tous les métiers disponibles sur notre plateforme'
              : 'Discover all the trades available on our platform'
            }
          </motion.p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`${createPageUrl('Workers')}?category=${category.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
                    <div className={`bg-gradient-to-br ${category.color} p-6 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <Icon className="h-12 w-12 text-white relative z-10" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-500 transition-colors">
                        {t(`categories.${category.slug}`)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.count} {language === 'fr' ? 'ouvriers' : 'workers'}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}