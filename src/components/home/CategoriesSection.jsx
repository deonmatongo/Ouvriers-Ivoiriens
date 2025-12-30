import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from "@/components/ui/button";
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
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { slug: 'plumbing', icon: Wrench, color: 'bg-blue-500', bgLight: 'bg-blue-50' },
  { slug: 'electrical', icon: Zap, color: 'bg-yellow-500', bgLight: 'bg-yellow-50' },
  { slug: 'carpentry', icon: Hammer, color: 'bg-amber-600', bgLight: 'bg-amber-50' },
  { slug: 'painting', icon: PaintBucket, color: 'bg-purple-500', bgLight: 'bg-purple-50' },
  { slug: 'masonry', icon: Blocks, color: 'bg-gray-600', bgLight: 'bg-gray-50' },
  { slug: 'cleaning', icon: Sparkles, color: 'bg-green-500', bgLight: 'bg-green-50' },
  { slug: 'gardening', icon: TreePine, color: 'bg-emerald-500', bgLight: 'bg-emerald-50' },
  { slug: 'airConditioning', icon: Fan, color: 'bg-cyan-500', bgLight: 'bg-cyan-50' },
];

export default function CategoriesSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t('home.popularCategories')}
            </h2>
            <p className="text-gray-600 mt-2">
              {language === 'fr' 
                ? 'Trouvez le professionnel adapté à vos besoins'
                : 'Find the right professional for your needs'
              }
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
            asChild
          >
            <Link to={createPageUrl('Categories')}>
              {t('home.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link 
                  to={`${createPageUrl('Workers')}?category=${category.slug}`}
                  className="group block"
                >
                  <div className={`${category.bgLight} rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-gray-200`}>
                    <div className="bg-orange-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-orange-500 transition-colors">
                      {t(`categories.${category.slug}`)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {Math.floor(Math.random() * 200) + 50}+ {language === 'fr' ? 'ouvriers' : 'workers'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}