import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin, CheckCircle, Clock, Briefcase, MessageSquare } from 'lucide-react';

export default function WorkerCard({ worker, variant = 'default' }) {
  const { t, language } = useLanguage();

  if (variant === 'compact') {
    return (
      <Link to={`${createPageUrl('WorkerProfile')}?id=${worker.id}`}>
        <Card className="group p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={worker.profile_photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'}
                alt={worker.full_name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              {worker.is_verified && (
                <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-orange-500 transition-colors">
                {worker.full_name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {worker.commune}, {worker.city}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{worker.rating_average?.toFixed(1) || '0.0'}</span>
              </div>
              <p className="text-xs text-gray-400">({worker.rating_count || 0})</p>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={worker.profile_photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'}
          alt={worker.full_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {worker.is_verified && (
            <div className="bg-green-500 text-white rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-medium">
              <CheckCircle className="h-3 w-3" />
              {t('worker.verified')}
            </div>
          )}
          {worker.availability === 'available' && (
            <div className="bg-blue-500 text-white rounded-full px-2.5 py-1 text-xs font-medium">
              {t('worker.available')}
            </div>
          )}
        </div>

        {/* Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold text-white mb-1">{worker.full_name}</h3>
          <p className="text-white/80 text-sm flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {worker.commune}, {worker.city}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {worker.skills?.slice(0, 3).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary"
              className="bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs"
            >
              {skill}
            </Badge>
          ))}
          {worker.skills?.length > 3 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
              +{worker.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900">{worker.rating_average?.toFixed(1) || '0.0'}</span>
            </div>
            <p className="text-xs text-gray-500">{worker.rating_count || 0} {t('worker.reviews')}</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span className="font-bold text-gray-900">{worker.jobs_completed || 0}</span>
            </div>
            <p className="text-xs text-gray-500">{language === 'fr' ? 'Travaux' : 'Jobs'}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="font-bold text-gray-900">{worker.response_time_hours || 2}h</span>
            </div>
            <p className="text-xs text-gray-500">{language === 'fr' ? 'Réponse' : 'Response'}</p>
          </div>
        </div>

        {/* Experience & Price */}
        <div className="flex items-center justify-between mt-4 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{worker.experience_years || 1}</span> {t('worker.yearsExp')}
          </p>
          {worker.services?.[0]?.price_min && (
            <p className="text-sm">
              <span className="text-gray-500">{language === 'fr' ? 'À partir de' : 'From'}</span>
              <span className="font-bold text-orange-500 ml-1">
                {worker.services[0].price_min.toLocaleString()} FCFA
              </span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            asChild
          >
            <Link to={`${createPageUrl('WorkerProfile')}?id=${worker.id}`}>
              {t('worker.requestQuote')}
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="border-gray-200 hover:border-orange-500 hover:text-orange-500"
            asChild
          >
            <Link to={`${createPageUrl('Messages')}?worker=${worker.id}`}>
              <MessageSquare className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}