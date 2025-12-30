import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../components/i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Settings,
  Bell,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-gray-100 text-gray-800',
  disputed: 'bg-red-100 text-red-800',
};

export default function Dashboard() {
  const { t, language } = useLanguage();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (e) {
        base44.auth.redirectToLogin();
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const { data: jobRequests = [] } = useQuery({
    queryKey: ['myJobRequests', user?.email],
    queryFn: () => base44.entities.JobRequest.filter({ customer_email: user?.email }, '-created_date'),
    enabled: !!user?.email,
  });

  const { data: quotes = [] } = useQuery({
    queryKey: ['myQuotes', user?.email],
    queryFn: () => base44.entities.Quote.filter({ customer_email: user?.email }, '-created_date'),
    enabled: !!user?.email,
  });

  const { data: conversations = [] } = useQuery({
    queryKey: ['myConversations', user?.email],
    queryFn: async () => {
      const conv1 = await base44.entities.Conversation.filter({ participant_1: user?.email }, '-last_message_date');
      const conv2 = await base44.entities.Conversation.filter({ participant_2: user?.email }, '-last_message_date');
      return [...conv1, ...conv2].sort((a, b) => 
        new Date(b.last_message_date) - new Date(a.last_message_date)
      );
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const stats = [
    {
      label: language === 'fr' ? 'Demandes actives' : 'Active Requests',
      value: jobRequests.filter(j => ['pending', 'quoted', 'accepted', 'in_progress'].includes(j.status)).length,
      icon: Briefcase,
      color: 'bg-blue-500',
    },
    {
      label: language === 'fr' ? 'Devis reçus' : 'Quotes Received',
      value: quotes.filter(q => q.status === 'pending').length,
      icon: FileText,
      color: 'bg-orange-500',
    },
    {
      label: language === 'fr' ? 'Travaux terminés' : 'Completed Jobs',
      value: jobRequests.filter(j => j.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: language === 'fr' ? 'Messages' : 'Messages',
      value: conversations.length,
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.profile_photo} />
                <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                  {user?.full_name?.charAt(0) || user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('dashboard.welcome')}, {user?.full_name?.split(' ')[0] || 'User'}
                </h1>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link to={createPageUrl('Settings')}>
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                <Link to={createPageUrl('Workers')}>
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Nouvelle demande' : 'New Request'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Requests */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {language === 'fr' ? 'Mes demandes' : 'My Requests'}
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={createPageUrl('MyJobs')}>
                    {t('home.viewAll')}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {jobRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    {language === 'fr' 
                      ? 'Vous n\'avez pas encore de demandes'
                      : 'You don\'t have any requests yet'
                    }
                  </p>
                  <Button asChild>
                    <Link to={createPageUrl('Workers')}>
                      {language === 'fr' ? 'Trouver un ouvrier' : 'Find a Worker'}
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobRequests.slice(0, 5).map((job) => (
                    <div 
                      key={job.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{job.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(job.created_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                        </p>
                      </div>
                      <Badge className={statusColors[job.status]}>
                        {t(`job.${job.status}`)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Quick Actions & Messages */}
          <div className="space-y-6">
            {/* Pending Quotes */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                {language === 'fr' ? 'Devis en attente' : 'Pending Quotes'}
              </h2>
              
              {quotes.filter(q => q.status === 'pending').length === 0 ? (
                <p className="text-gray-500 text-sm">
                  {language === 'fr' ? 'Aucun devis en attente' : 'No pending quotes'}
                </p>
              ) : (
                <div className="space-y-3">
                  {quotes.filter(q => q.status === 'pending').slice(0, 3).map((quote) => (
                    <div 
                      key={quote.id}
                      className="p-3 bg-orange-50 rounded-lg border border-orange-100"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {quote.amount?.toLocaleString()} FCFA
                        </span>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                          {language === 'fr' ? 'Nouveau' : 'New'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{quote.estimated_duration}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Messages */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {language === 'fr' ? 'Messages récents' : 'Recent Messages'}
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={createPageUrl('Messages')}>
                    {t('home.viewAll')}
                  </Link>
                </Button>
              </div>
              
              {conversations.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  {language === 'fr' ? 'Aucun message' : 'No messages'}
                </p>
              ) : (
                <div className="space-y-3">
                  {conversations.slice(0, 3).map((conv) => (
                    <Link
                      key={conv.id}
                      to={`${createPageUrl('Messages')}?id=${conv.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {(conv.participant_1 === user?.email ? conv.participant_2 : conv.participant_1)?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conv.participant_1 === user?.email ? conv.participant_2 : conv.participant_1}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{conv.last_message}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                {t('dashboard.quickActions')}
              </h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={createPageUrl('Workers')}>
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Trouver un ouvrier' : 'Find a Worker'}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={createPageUrl('MyJobs')}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Voir mes travaux' : 'View My Jobs'}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={createPageUrl('Settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Paramètres' : 'Settings'}
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}