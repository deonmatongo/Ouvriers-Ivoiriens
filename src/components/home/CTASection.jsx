import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';
// Removed base44 import - using dummy data

export default function CTASection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* For Customers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {language === 'fr' 
                  ? 'Vous cherchez un ouvrier ?' 
                  : 'Looking for a Worker?'
                }
              </h3>
              
              <p className="text-orange-100 mb-8 max-w-md">
                {language === 'fr'
                  ? 'Trouvez le professionnel idéal pour vos travaux. Comparez les profils, les avis et les tarifs.'
                  : 'Find the ideal professional for your work. Compare profiles, reviews, and rates.'
                }
              </p>
              
              <Button 
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50"
                asChild
              >
                <Link to={createPageUrl('Workers')}>
                  {language === 'fr' ? 'Trouver un ouvrier' : 'Find a Worker'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* For Workers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-gray-700"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-orange-500" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {language === 'fr' 
                  ? 'Vous êtes un ouvrier ?' 
                  : 'Are You a Worker?'
                }
              </h3>
              
              <p className="text-gray-400 mb-8 max-w-md">
                {language === 'fr'
                  ? 'Rejoignez notre réseau et développez votre clientèle. Inscription gratuite.'
                  : 'Join our network and grow your customer base. Free registration.'
                }
              </p>
              
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                asChild
              >
                <Link to={createPageUrl('BecomeWorker')}>
                  {language === 'fr' ? 'Devenir ouvrier' : 'Become a Worker'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}