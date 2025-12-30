import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../components/i18n/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  FileText, 
  CheckCircle, 
  Star,
  ArrowRight,
  Users,
  Shield,
  CreditCard,
  MessageSquare,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: Search,
    titleFr: 'Recherchez un ouvrier',
    titleEn: 'Search for a Worker',
    descFr: 'Utilisez notre moteur de recherche pour trouver l\'ouvrier idéal. Filtrez par métier, localisation, avis clients et disponibilité.',
    descEn: 'Use our search engine to find the ideal worker. Filter by trade, location, customer reviews and availability.',
  },
  {
    number: '02',
    icon: FileText,
    titleFr: 'Demandez un devis',
    titleEn: 'Request a Quote',
    descFr: 'Décrivez votre projet en détail et envoyez une demande de devis. L\'ouvrier vous répondra rapidement avec une proposition.',
    descEn: 'Describe your project in detail and send a quote request. The worker will respond quickly with a proposal.',
  },
  {
    number: '03',
    icon: MessageSquare,
    titleFr: 'Échangez et planifiez',
    titleEn: 'Communicate and Plan',
    descFr: 'Discutez directement avec l\'ouvrier via notre messagerie sécurisée. Convenez des détails et planifiez l\'intervention.',
    descEn: 'Chat directly with the worker via our secure messaging. Agree on details and schedule the work.',
  },
  {
    number: '04',
    icon: CheckCircle,
    titleFr: 'Réalisez vos travaux',
    titleEn: 'Get the Work Done',
    descFr: 'L\'ouvrier réalise vos travaux selon les termes convenus. Suivez l\'avancement et restez en contact.',
    descEn: 'The worker performs your work according to the agreed terms. Track progress and stay in touch.',
  },
  {
    number: '05',
    icon: Star,
    titleFr: 'Évaluez et partagez',
    titleEn: 'Rate and Share',
    descFr: 'Une fois le travail terminé, laissez un avis pour aider la communauté à trouver les meilleurs ouvriers.',
    descEn: 'Once the work is done, leave a review to help the community find the best workers.',
  },
];

const benefits = [
  {
    icon: Shield,
    titleFr: 'Ouvriers vérifiés',
    titleEn: 'Verified Workers',
    descFr: 'Tous nos ouvriers sont vérifiés pour garantir leur professionnalisme.',
    descEn: 'All our workers are verified to guarantee their professionalism.',
  },
  {
    icon: Clock,
    titleFr: 'Réponse rapide',
    titleEn: 'Fast Response',
    descFr: 'Recevez des réponses en quelques heures seulement.',
    descEn: 'Receive responses in just a few hours.',
  },
  {
    icon: CreditCard,
    titleFr: 'Devis gratuits',
    titleEn: 'Free Quotes',
    descFr: 'Demandez autant de devis que vous voulez, sans frais.',
    descEn: 'Request as many quotes as you want, free of charge.',
  },
  {
    icon: Users,
    titleFr: 'Avis authentiques',
    titleEn: 'Authentic Reviews',
    descFr: 'Des avis vérifiés laissés par de vrais clients.',
    descEn: 'Verified reviews left by real customers.',
  },
];

export default function HowItWorks() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            {language === 'fr' ? 'Comment ça marche ?' : 'How It Works'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {language === 'fr'
              ? 'En 5 étapes simples, trouvez le professionnel idéal pour vos travaux'
              : 'In 5 simple steps, find the ideal professional for your work'
            }
          </motion.p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
              >
                {/* Image/Icon Side */}
                <div className="flex-1 w-full">
                  <div className={`relative ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
                    <div className="absolute top-0 left-0 text-9xl font-bold text-gray-100 -z-10">
                      {step.number}
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 flex items-center justify-center">
                      <Icon className="h-24 w-24 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {language === 'fr' ? 'Étape' : 'Step'} {step.number}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {language === 'fr' ? step.titleFr : step.titleEn}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {language === 'fr' ? step.descFr : step.descEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Pourquoi nous choisir ?' : 'Why Choose Us?'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Ouvriers-Ivoiriens vous offre la meilleure expérience pour trouver des professionnels de confiance'
                : 'Ouvriers-Ivoiriens offers you the best experience to find trusted professionals'
              }
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {language === 'fr' ? benefit.titleFr : benefit.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'fr' ? benefit.descFr : benefit.descEn}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {language === 'fr' 
              ? 'Prêt à commencer ?' 
              : 'Ready to Get Started?'
            }
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            {language === 'fr'
              ? 'Rejoignez des milliers de clients satisfaits'
              : 'Join thousands of satisfied customers'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to={createPageUrl('BecomeWorker')}>
                {language === 'fr' ? 'Devenir ouvrier' : 'Become a Worker'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}