import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Aminata Koné',
    role: 'Propriétaire',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
    rating: 5,
    textFr: 'J\'ai trouvé un excellent plombier en moins de 30 minutes. Le travail a été fait rapidement et proprement. Je recommande vivement cette plateforme !',
    textEn: 'I found an excellent plumber in less than 30 minutes. The work was done quickly and cleanly. I highly recommend this platform!',
    location: 'Cocody, Abidjan'
  },
  {
    id: 2,
    name: 'Marc Diallo',
    role: 'Chef d\'entreprise',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 5,
    textFr: 'Pour la rénovation de mes bureaux, j\'ai fait appel à plusieurs artisans via la plateforme. Tous étaient professionnels et ponctuels.',
    textEn: 'For the renovation of my offices, I called on several craftsmen via the platform. All were professional and punctual.',
    location: 'Plateau, Abidjan'
  },
  {
    id: 3,
    name: 'Fatou Bamba',
    role: 'Architecte',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    rating: 5,
    textFr: 'En tant qu\'architecte, je recommande régulièrement des ouvriers à mes clients. Cette plateforme facilite grandement le processus.',
    textEn: 'As an architect, I regularly recommend workers to my clients. This platform greatly facilitates the process.',
    location: 'Marcory, Abidjan'
  },
];

export default function TestimonialsSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === 'fr' ? 'Ce que disent nos clients' : 'What Our Customers Say'}
          </h2>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Des milliers de clients satisfaits font confiance à Ouvriers-Ivoiriens'
              : 'Thousands of satisfied customers trust Ouvriers-Ivoiriens'
            }
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-orange-100" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{language === 'fr' ? testimonial.textFr : testimonial.textEn}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}