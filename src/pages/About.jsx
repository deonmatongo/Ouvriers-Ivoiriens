import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../components/i18n/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Building2, 
  Globe,
  Award,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { value: '5,000+', labelFr: 'Ouvriers qualifiés', labelEn: 'Qualified Workers' },
  { value: '50,000+', labelFr: 'Travaux réalisés', labelEn: 'Jobs Completed' },
  { value: '15+', labelFr: 'Villes couvertes', labelEn: 'Cities Covered' },
  { value: '4.8/5', labelFr: 'Note moyenne', labelEn: 'Average Rating' },
];

const values = [
  {
    icon: Heart,
    titleFr: 'Confiance',
    titleEn: 'Trust',
    descFr: 'Nous vérifions chaque ouvrier pour garantir leur professionnalisme et leur fiabilité.',
    descEn: 'We verify each worker to guarantee their professionalism and reliability.',
  },
  {
    icon: Award,
    titleFr: 'Excellence',
    titleEn: 'Excellence',
    descFr: 'Nous promouvons la qualité du travail et récompensons les meilleurs ouvriers.',
    descEn: 'We promote quality work and reward the best workers.',
  },
  {
    icon: Users,
    titleFr: 'Communauté',
    titleEn: 'Community',
    descFr: 'Nous créons un écosystème où clients et ouvriers prospèrent ensemble.',
    descEn: 'We create an ecosystem where customers and workers thrive together.',
  },
  {
    icon: Globe,
    titleFr: 'Accessibilité',
    titleEn: 'Accessibility',
    descFr: 'Notre plateforme est conçue pour être simple et accessible à tous.',
    descEn: 'Our platform is designed to be simple and accessible to everyone.',
  },
];

const team = [
  {
    name: 'Kouamé Ange',
    role: 'CEO & Fondateur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Fatou Diallo',
    role: 'Directrice des Opérations',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  },
  {
    name: 'Ibrahim Traoré',
    role: 'Directeur Technique',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Aminata Koné',
    role: 'Responsable Marketing',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
];

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              {language === 'fr' 
                ? 'Connecter les talents aux opportunités' 
                : 'Connecting Talents to Opportunities'
              }
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-orange-100"
            >
              {language === 'fr'
                ? 'Ouvriers-Ivoiriens est la première plateforme qui met en relation les clients avec les meilleurs artisans en Côte d\'Ivoire.'
                : 'Ouvriers-Ivoiriens is the first platform connecting customers with the best artisans in Côte d\'Ivoire.'
              }
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center bg-white shadow-xl border-0">
                <p className="text-3xl lg:text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {language === 'fr' ? stat.labelFr : stat.labelEn}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'fr' ? 'Notre Mission' : 'Our Mission'}
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {language === 'fr'
                ? 'Faciliter la mise en relation entre les clients et les ouvriers qualifiés en Côte d\'Ivoire, tout en valorisant le savoir-faire local et en créant des opportunités économiques pour les artisans.'
                : 'Facilitate the connection between customers and qualified workers in Côte d\'Ivoire, while promoting local know-how and creating economic opportunities for artisans.'
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'fr' ? 'Notre Vision' : 'Our Vision'}
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {language === 'fr'
                ? 'Devenir la référence incontournable pour trouver des professionnels de confiance en Afrique de l\'Ouest, en transformant la manière dont les services sont rendus et valorisés.'
                : 'Become the go-to reference for finding trusted professionals in West Africa, transforming the way services are delivered and valued.'
              }
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Les principes qui guident chacune de nos actions'
                : 'The principles that guide each of our actions'
              }
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full border-0 shadow-lg">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {language === 'fr' ? value.titleFr : value.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'fr' ? value.descFr : value.descEn}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Des passionnés qui travaillent chaque jour pour améliorer votre expérience'
              : 'Passionate people who work every day to improve your experience'
            }
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 rounded-2xl object-cover mx-auto mb-4 shadow-lg"
              />
              <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {language === 'fr' 
              ? 'Rejoignez l\'aventure' 
              : 'Join the Adventure'
            }
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {language === 'fr'
              ? 'Que vous soyez client ou ouvrier, nous avons une place pour vous'
              : 'Whether you\'re a customer or a worker, we have a place for you'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
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
              className="border-gray-600 text-white hover:bg-gray-800"
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