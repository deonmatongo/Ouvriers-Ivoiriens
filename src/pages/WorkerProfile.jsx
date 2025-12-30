import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../components/i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Briefcase, 
  MessageSquare,
  Phone,
  Calendar,
  Languages,
  Award,
  Share2,
  Heart,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import JobRequestForm from '../components/jobs/JobRequestForm';

export default function WorkerProfile() {
  const { t, language } = useLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const workerId = urlParams.get('id');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: worker, isLoading } = useQuery({
    queryKey: ['worker', workerId],
    queryFn: () => base44.entities.Worker.filter({ id: workerId }),
    select: (data) => data[0],
    enabled: !!workerId,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', workerId],
    queryFn: () => base44.entities.Review.filter({ worker_id: workerId, status: 'approved' }, '-created_date'),
    enabled: !!workerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            {language === 'fr' ? 'Ouvrier non trouvé' : 'Worker not found'}
          </h2>
          <Link to={createPageUrl('Workers')}>
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Retour à la liste' : 'Back to list'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const ratingBreakdown = {
    quality: worker.rating_average || 0,
    punctuality: (worker.rating_average || 0) - 0.1,
    communication: (worker.rating_average || 0) + 0.1,
    value: (worker.rating_average || 0) - 0.2,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <Link 
            to={createPageUrl('Workers')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-orange-500 mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {language === 'fr' ? 'Retour aux résultats' : 'Back to results'}
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={worker.profile_photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'}
                  alt={worker.full_name}
                  className="w-40 h-40 rounded-2xl object-cover shadow-lg"
                />
                {worker.is_verified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-4 justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {worker.full_name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {worker.commune}, {worker.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {language === 'fr' ? 'Répond en' : 'Responds in'} ~{worker.response_time_hours || 2}h
                    </span>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {worker.skills?.map((skill) => (
                      <Badge 
                        key={skill} 
                        className="bg-orange-50 text-orange-600 hover:bg-orange-100"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold text-gray-900">
                      {worker.rating_average?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {worker.rating_count || 0} {t('worker.reviews')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{worker.jobs_completed || 0}</p>
                  <p className="text-sm text-gray-500">{t('worker.jobsCompleted')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{worker.experience_years || 1}</p>
                  <p className="text-sm text-gray-500">{t('worker.yearsExp')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {worker.availability === 'available' ? '✓' : '—'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t(`worker.${worker.availability || 'available'}`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start bg-white border rounded-lg p-1">
                <TabsTrigger value="about">{t('worker.about')}</TabsTrigger>
                <TabsTrigger value="services">{t('worker.services')}</TabsTrigger>
                <TabsTrigger value="portfolio">{t('worker.portfolio')}</TabsTrigger>
                <TabsTrigger value="reviews">{t('worker.reviews')}</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{t('worker.about')}</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {worker.bio || (language === 'fr' 
                      ? 'Professionnel expérimenté, je mets mon savoir-faire au service de mes clients pour des travaux de qualité.'
                      : 'Experienced professional, I put my expertise at the service of my clients for quality work.'
                    )}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('worker.memberSince')}</p>
                        <p className="font-medium">
                          {new Date(worker.created_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                        <Languages className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('worker.languages')}</p>
                        <p className="font-medium">
                          {worker.languages?.join(', ') || 'Français'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{t('worker.services')}</h3>
                  <div className="space-y-4">
                    {worker.services?.length > 0 ? (
                      worker.services.map((service, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">
                              {language === 'fr' ? service.name_fr : service.name_en}
                            </h4>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                              {service.price_min?.toLocaleString()} - {service.price_max?.toLocaleString()} FCFA
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'fr' ? service.description_fr : service.description_en}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        {language === 'fr' 
                          ? 'Contactez l\'ouvrier pour plus de détails sur ses services.'
                          : 'Contact the worker for more details on their services.'
                        }
                      </p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{t('worker.portfolio')}</h3>
                  {worker.portfolio_images?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {worker.portfolio_images.map((image, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-xl"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      {language === 'fr' 
                        ? 'Aucune image de portfolio disponible.'
                        : 'No portfolio images available.'
                      }
                    </p>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">{t('worker.reviews')}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-lg">{worker.rating_average?.toFixed(1) || '0.0'}</span>
                      <span className="text-gray-500">({reviews.length})</span>
                    </div>
                  </div>

                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b last:border-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarFallback>
                                {review.customer_email?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium">{review.customer_email?.split('@')[0]}</p>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                              <p className="text-sm text-gray-400 mt-2">
                                {new Date(review.created_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">{t('review.noReviews')}</p>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-4">
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">{t('worker.priceRange')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {worker.services?.[0]?.price_min 
                    ? `${worker.services[0].price_min.toLocaleString()} - ${worker.services[0].price_max?.toLocaleString()} FCFA`
                    : (language === 'fr' ? 'Sur devis' : 'Quote based')
                  }
                </p>
              </div>

              <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 mb-3" size="lg">
                    {t('worker.requestQuote')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t('worker.requestQuote')}</DialogTitle>
                  </DialogHeader>
                  <JobRequestForm 
                    worker={worker} 
                    onSuccess={() => setShowRequestForm(false)}
                  />
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link to={`${createPageUrl('Messages')}?worker=${worker.id}`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t('worker.contactWorker')}
                </Link>
              </Button>

              {worker.phone && (
                <Button variant="ghost" className="w-full mt-2" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  {worker.phone}
                </Button>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Award className="h-4 w-4 text-green-500" />
                  {language === 'fr' ? 'Paiement sécurisé' : 'Secure payment'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {language === 'fr' ? 'Devis gratuit' : 'Free quote'}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Portfolio"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}