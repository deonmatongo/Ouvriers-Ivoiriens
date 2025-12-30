import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../components/i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CheckCircle, 
  ArrowRight, 
  Upload, 
  Loader2,
  Briefcase,
  DollarSign,
  Users,
  Star,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
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
];

const cities = ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro', 'Korhogo', 'Man'];
const communes = ['Cocody', 'Plateau', 'Marcory', 'Treichville', 'Yopougon', 'Abobo', 'Adjamé'];

const benefits = [
  {
    icon: Users,
    titleFr: 'Accédez à des milliers de clients',
    titleEn: 'Access thousands of customers',
    descFr: 'Connectez-vous avec des clients qui recherchent vos services',
    descEn: 'Connect with customers looking for your services',
  },
  {
    icon: DollarSign,
    titleFr: 'Augmentez vos revenus',
    titleEn: 'Increase your income',
    descFr: 'Recevez plus de demandes et développez votre activité',
    descEn: 'Receive more requests and grow your business',
  },
  {
    icon: Star,
    titleFr: 'Construisez votre réputation',
    titleEn: 'Build your reputation',
    descFr: 'Collectez des avis positifs et gagnez en visibilité',
    descEn: 'Collect positive reviews and gain visibility',
  },
  {
    icon: Briefcase,
    titleFr: 'Gérez facilement vos travaux',
    titleEn: 'Easily manage your jobs',
    descFr: 'Utilisez notre tableau de bord pour suivre vos demandes',
    descEn: 'Use our dashboard to track your requests',
  },
];

export default function BecomeWorker() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    skills: [],
    city: 'Abidjan',
    commune: '',
    experience_years: '',
    languages: ['Français'],
    termsAccepted: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
          setFormData(prev => ({
            ...prev,
            full_name: userData.full_name || '',
          }));
        }
      } catch (e) {
        console.log('Not authenticated');
      }
    };
    checkAuth();
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setProfilePhoto(file_url);
      } catch (error) {
        toast.error(language === 'fr' ? 'Erreur lors du téléchargement' : 'Upload error');
      }
    }
  };

  const handlePortfolioUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setPortfolioImages(prev => [...prev, file_url]);
      } catch (error) {
        toast.error(language === 'fr' ? 'Erreur lors du téléchargement' : 'Upload error');
      }
    }
  };

  const removePortfolioImage = (index) => {
    setPortfolioImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      base44.auth.redirectToLogin(window.location.href);
      return;
    }

    if (!formData.termsAccepted) {
      toast.error(language === 'fr' ? 'Veuillez accepter les conditions' : 'Please accept the terms');
      return;
    }

    if (formData.skills.length === 0) {
      toast.error(language === 'fr' ? 'Sélectionnez au moins une compétence' : 'Select at least one skill');
      return;
    }

    setIsSubmitting(true);

    try {
      await base44.entities.Worker.create({
        user_email: user.email,
        full_name: formData.full_name,
        phone: formData.phone,
        bio: formData.bio,
        skills: formData.skills,
        city: formData.city,
        commune: formData.commune,
        experience_years: parseInt(formData.experience_years) || 0,
        profile_photo: profilePhoto,
        portfolio_images: portfolioImages,
        languages: formData.languages,
        status: 'pending',
        is_verified: false,
        availability: 'available',
        rating_average: 0,
        rating_count: 0,
        jobs_completed: 0,
      });

      await base44.auth.updateMe({ user_type: 'worker' });

      toast.success(language === 'fr' 
        ? 'Inscription réussie ! Votre profil est en cours de vérification.' 
        : 'Registration successful! Your profile is being verified.'
      );
      
      navigate(createPageUrl('WorkerDashboard'));
    } catch (error) {
      toast.error(language === 'fr' ? 'Erreur lors de l\'inscription' : 'Registration error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold mb-6"
            >
              {language === 'fr' 
                ? 'Devenez ouvrier sur notre plateforme' 
                : 'Become a Worker on Our Platform'
              }
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              {language === 'fr'
                ? 'Rejoignez des milliers d\'artisans et développez votre activité'
                : 'Join thousands of artisans and grow your business'
              }
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Benefits */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'fr' ? 'Pourquoi nous rejoindre ?' : 'Why Join Us?'}
            </h2>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {language === 'fr' ? benefit.titleFr : benefit.titleEn}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'fr' ? benefit.descFr : benefit.descEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Créez votre profil' : 'Create Your Profile'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="cursor-pointer">
                      <div className="text-sm font-medium text-orange-500 hover:text-orange-600">
                        {language === 'fr' ? 'Ajouter une photo' : 'Add a photo'}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === 'fr' ? 'Photo professionnelle recommandée' : 'Professional photo recommended'}
                    </p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'fr' ? 'Nom complet' : 'Full Name'} *</Label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label>{language === 'fr' ? 'Téléphone' : 'Phone'} *</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+225 07 00 00 00 00"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'fr' ? 'Ville' : 'City'} *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{language === 'fr' ? 'Commune' : 'Commune'}</Label>
                    <Select
                      value={formData.commune}
                      onValueChange={(value) => setFormData({ ...formData, commune: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} />
                      </SelectTrigger>
                      <SelectContent>
                        {communes.map((commune) => (
                          <SelectItem key={commune} value={commune}>{commune}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label>{language === 'fr' ? 'Compétences' : 'Skills'} *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => toggleSkill(cat.value)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          formData.skills.includes(cat.value)
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500'
                        }`}
                      >
                        {language === 'fr' ? cat.labelFr : cat.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <Label>{language === 'fr' ? 'Années d\'expérience' : 'Years of Experience'}</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    className="mt-1 w-32"
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label>{language === 'fr' ? 'Présentez-vous' : 'About You'}</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder={language === 'fr' 
                      ? 'Décrivez votre expérience, vos spécialités...' 
                      : 'Describe your experience, specialties...'
                    }
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <Label>{language === 'fr' ? 'Portfolio (photos de vos travaux)' : 'Portfolio (photos of your work)'}</Label>
                  <div className="mt-2 space-y-3">
                    {portfolioImages.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {portfolioImages.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img}
                              alt={`Portfolio ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removePortfolioImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
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
                        onChange={handlePortfolioUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked })}
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    {language === 'fr' 
                      ? 'J\'accepte les conditions d\'utilisation et la politique de confidentialité'
                      : 'I accept the terms of service and privacy policy'
                    }
                  </Label>
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
                      {language === 'fr' ? 'Inscription en cours...' : 'Registering...'}
                    </>
                  ) : (
                    <>
                      {language === 'fr' ? 'S\'inscrire comme ouvrier' : 'Register as Worker'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}