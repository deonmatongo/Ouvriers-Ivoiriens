import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Search, FileText, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    titleFr: 'Recherchez',
    titleEn: 'Search',
    descFr: 'Trouvez l\'ouvrier idéal selon vos critères : métier, localisation, avis clients',
    descEn: 'Find the ideal worker based on your criteria: trade, location, customer reviews',
  },
  {
    icon: FileText,
    titleFr: 'Demandez un devis',
    titleEn: 'Request a Quote',
    descFr: 'Décrivez votre projet et recevez des devis gratuits et personnalisés',
    descEn: 'Describe your project and receive free, personalized quotes',
  },
  {
    icon: CheckCircle,
    titleFr: 'Réalisez vos travaux',
    titleEn: 'Get the Work Done',
    descFr: 'Choisissez le meilleur devis et suivez l\'avancement de vos travaux',
    descEn: 'Choose the best quote and track the progress of your work',
  },
  {
    icon: Star,
    titleFr: 'Évaluez',
    titleEn: 'Rate',
    descFr: 'Partagez votre expérience pour aider la communauté à faire le bon choix',
    descEn: 'Share your experience to help the community make the right choice',
  },
];

export default function HowItWorksSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('home.howItWorks')}
          </h2>
          <p className="text-lg text-gray-600">
            {language === 'fr'
              ? 'En quelques étapes simples, trouvez le professionnel qu\'il vous faut'
              : 'In a few simple steps, find the professional you need'
            }
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-orange-100" />
                )}
                
                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100">
                      <Icon className="h-10 w-10 text-orange-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'fr' ? step.titleFr : step.titleEn}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'fr' ? step.descFr : step.descEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}