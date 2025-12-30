import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Loader2,
  Upload,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    city: '',
    commune: '',
    preferred_language: 'fr',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin();
          return;
        }
        const userData = await base44.auth.me();
        setUser(userData);
        setFormData({
          full_name: userData.full_name || '',
          phone: userData.phone || '',
          city: userData.city || '',
          commune: userData.commune || '',
          preferred_language: userData.preferred_language || 'fr',
        });
        setNotifications(userData.notification_preferences || { email: true, sms: true, push: true });
      } catch (e) {
        base44.auth.redirectToLogin();
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      await base44.auth.updateMe(data);
    },
    onSuccess: () => {
      toast.success(language === 'fr' ? 'Profil mis à jour' : 'Profile updated');
    },
  });

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setProfilePhoto(file_url);
        updateProfileMutation.mutate({ profile_photo: file_url });
      } catch (error) {
        toast.error(language === 'fr' ? 'Erreur lors du téléchargement' : 'Upload error');
      }
    }
  };

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(formData);
  };

  const handleSaveNotifications = () => {
    updateProfileMutation.mutate({ notification_preferences: notifications });
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setFormData({ ...formData, preferred_language: newLang });
    updateProfileMutation.mutate({ preferred_language: newLang });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{t('nav.settings')}</h1>
          <p className="text-gray-500 mt-1">
            {language === 'fr' ? 'Gérez vos préférences et informations' : 'Manage your preferences and information'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {language === 'fr' ? 'Profil' : 'Profile'}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              {language === 'fr' ? 'Notifications' : 'Notifications'}
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {language === 'fr' ? 'Langue' : 'Language'}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {language === 'fr' ? 'Sécurité' : 'Security'}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'fr' ? 'Informations personnelles' : 'Personal Information'}
              </h2>

              {/* Profile Photo */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profilePhoto || user?.profile_photo} />
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl">
                    {user?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label className="cursor-pointer">
                    <div className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      {language === 'fr' ? 'Changer la photo' : 'Change photo'}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG (max 5MB)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>{language === 'fr' ? 'Nom complet' : 'Full Name'}</Label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    value={user?.email}
                    disabled
                    className="mt-1 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'fr' ? 'L\'email ne peut pas être modifié' : 'Email cannot be changed'}
                  </p>
                </div>

                <div>
                  <Label>{language === 'fr' ? 'Téléphone' : 'Phone'}</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+225 07 00 00 00 00"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'fr' ? 'Ville' : 'City'}</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>{language === 'fr' ? 'Commune' : 'Commune'}</Label>
                    <Input
                      value={formData.commune}
                      onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {t('common.save')}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'fr' ? 'Préférences de notification' : 'Notification Preferences'}
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{language === 'fr' ? 'Notifications par email' : 'Email Notifications'}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'fr' ? 'Recevez des notifications par email' : 'Receive notifications via email'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{language === 'fr' ? 'Notifications SMS' : 'SMS Notifications'}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'fr' ? 'Recevez des notifications par SMS' : 'Receive notifications via SMS'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{language === 'fr' ? 'Notifications push' : 'Push Notifications'}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'fr' ? 'Recevez des notifications dans le navigateur' : 'Receive browser notifications'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <Button 
                  onClick={handleSaveNotifications}
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={updateProfileMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {t('common.save')}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Language Tab */}
          <TabsContent value="language">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'fr' ? 'Langue préférée' : 'Preferred Language'}
              </h2>

              <div className="space-y-4">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">🇨🇮 Français</SelectItem>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  {language === 'fr' 
                    ? 'Cette langue sera utilisée pour l\'interface de l\'application'
                    : 'This language will be used for the application interface'
                  }
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'fr' ? 'Sécurité' : 'Security'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">
                    {language === 'fr' ? 'Mot de passe' : 'Password'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {language === 'fr' 
                      ? 'Pour modifier votre mot de passe, veuillez vous déconnecter et utiliser "Mot de passe oublié"'
                      : 'To change your password, please log out and use "Forgot Password"'
                    }
                  </p>
                  <Button variant="outline" onClick={() => {
                    setUser(null);
                    window.location.href = '/';
                  }}>
                    {language === 'fr' ? 'Se déconnecter' : 'Log Out'}
                  </Button>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-medium text-red-600 mb-2">
                    {language === 'fr' ? 'Zone de danger' : 'Danger Zone'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {language === 'fr' 
                      ? 'Supprimer définitivement votre compte'
                      : 'Permanently delete your account'
                    }
                  </p>
                  <Button variant="destructive">
                    {language === 'fr' ? 'Supprimer le compte' : 'Delete Account'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}