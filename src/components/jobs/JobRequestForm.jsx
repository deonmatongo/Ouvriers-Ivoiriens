import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { CalendarIcon, Upload, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  { value: 'plumbing', labelFr: 'Plomberie', labelEn: 'Plumbing' },
  { value: 'electrical', labelFr: 'Électricité', labelEn: 'Electrical' },
  { value: 'carpentry', labelFr: 'Menuiserie', labelEn: 'Carpentry' },
  { value: 'painting', labelFr: 'Peinture', labelEn: 'Painting' },
  { value: 'masonry', labelFr: 'Maçonnerie', labelEn: 'Masonry' },
  { value: 'cleaning', labelFr: 'Nettoyage', labelEn: 'Cleaning' },
  { value: 'gardening', labelFr: 'Jardinage', labelEn: 'Gardening' },
  { value: 'airConditioning', labelFr: 'Climatisation', labelEn: 'Air Conditioning' },
  { value: 'other', labelFr: 'Autre', labelEn: 'Other' },
];

export default function JobRequestForm({ worker, onSuccess }) {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: worker?.skills?.[0] || '',
    location: '',
    city: 'Abidjan',
    commune: '',
    preferred_date: null,
    preferred_time: 'flexible',
    budget_min: '',
    budget_max: '',
    urgency: 'normal',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
          if (userData.city) setFormData(prev => ({ ...prev, city: userData.city }));
          if (userData.commune) setFormData(prev => ({ ...prev, commune: userData.commune }));
        }
      } catch (e) {
        console.log('Not authenticated');
      }
    };
    checkAuth();
  }, []);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setImages(prev => [...prev, file_url]);
      } catch (error) {
        toast.error(language === 'fr' ? 'Erreur lors du téléchargement' : 'Upload error');
      }
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      base44.auth.redirectToLogin(window.location.href);
      return;
    }

    if (!formData.title || !formData.description) {
      toast.error(language === 'fr' ? 'Veuillez remplir tous les champs requis' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await base44.entities.JobRequest.create({
        ...formData,
        customer_email: user.email,
        worker_id: worker.id,
        preferred_date: formData.preferred_date ? format(formData.preferred_date, 'yyyy-MM-dd') : null,
        budget_min: formData.budget_min ? parseInt(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseInt(formData.budget_max) : null,
        images: images,
        status: 'pending',
      });

      toast.success(language === 'fr' ? 'Demande envoyée avec succès !' : 'Request sent successfully!');
      onSuccess?.();
    } catch (error) {
      toast.error(language === 'fr' ? 'Erreur lors de l\'envoi' : 'Error sending request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">{t('job.title')} *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder={language === 'fr' ? 'Ex: Réparation fuite d\'eau' : 'Ex: Water leak repair'}
          className="mt-1"
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">{t('job.description')} *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder={language === 'fr' 
            ? 'Décrivez votre projet en détail...' 
            : 'Describe your project in detail...'
          }
          className="mt-1 min-h-[120px]"
        />
      </div>

      {/* Category */}
      <div>
        <Label>{t('job.category')}</Label>
        <Select
          value={formData.category_id}
          onValueChange={(value) => setFormData({ ...formData, category_id: value })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={language === 'fr' ? 'Sélectionnez une catégorie' : 'Select a category'} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {language === 'fr' ? cat.labelFr : cat.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">{language === 'fr' ? 'Ville' : 'City'}</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="commune">{language === 'fr' ? 'Commune' : 'Commune'}</Label>
          <Input
            id="commune"
            value={formData.commune}
            onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">{t('job.location')}</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder={language === 'fr' ? 'Adresse précise (optionnel)' : 'Precise address (optional)'}
          className="mt-1"
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{t('job.preferredDate')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-1 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.preferred_date ? (
                  format(formData.preferred_date, 'PPP', { locale: language === 'fr' ? fr : enUS })
                ) : (
                  <span className="text-muted-foreground">
                    {language === 'fr' ? 'Choisir une date' : 'Pick a date'}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.preferred_date}
                onSelect={(date) => setFormData({ ...formData, preferred_date: date })}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>{t('job.preferredTime')}</Label>
          <Select
            value={formData.preferred_time}
            onValueChange={(value) => setFormData({ ...formData, preferred_time: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">{t('job.morning')}</SelectItem>
              <SelectItem value="afternoon">{t('job.afternoon')}</SelectItem>
              <SelectItem value="evening">{t('job.evening')}</SelectItem>
              <SelectItem value="flexible">{t('job.flexible')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Budget */}
      <div>
        <Label>{t('job.budget')} (FCFA)</Label>
        <div className="grid grid-cols-2 gap-4 mt-1">
          <Input
            type="number"
            value={formData.budget_min}
            onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
            placeholder="Min"
          />
          <Input
            type="number"
            value={formData.budget_max}
            onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
            placeholder="Max"
          />
        </div>
      </div>

      {/* Urgency */}
      <div>
        <Label>{t('job.urgency')}</Label>
        <Select
          value={formData.urgency}
          onValueChange={(value) => setFormData({ ...formData, urgency: value })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">{t('job.low')}</SelectItem>
            <SelectItem value="normal">{t('job.normal')}</SelectItem>
            <SelectItem value="urgent">{t('job.urgent')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Images */}
      <div>
        <Label>{language === 'fr' ? 'Photos (optionnel)' : 'Photos (optional)'}</Label>
        <div className="mt-2 space-y-3">
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Upload ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
            <div className="text-center">
              <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <span className="text-sm text-gray-500">
                {language === 'fr' ? 'Ajouter des photos' : 'Add photos'}
              </span>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Submit */}
      <Button 
        type="submit" 
        className="w-full bg-orange-500 hover:bg-orange-600"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
          </>
        ) : (
          t('job.submit')
        )}
      </Button>
    </form>
  );
}