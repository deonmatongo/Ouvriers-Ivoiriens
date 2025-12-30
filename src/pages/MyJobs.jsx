import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../components/i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Briefcase, 
  Clock, 
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { toast } from 'sonner';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  quoted: 'bg-blue-100 text-blue-800 border-blue-200',
  accepted: 'bg-green-100 text-green-800 border-green-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
  disputed: 'bg-red-100 text-red-800 border-red-200',
};

export default function MyJobs() {
  const { t, language } = useLanguage();
  const [user, setUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const queryClient = useQueryClient();

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
      }
    };
    checkAuth();
  }, []);

  const { data: jobRequests = [], isLoading } = useQuery({
    queryKey: ['myJobRequests', user?.email],
    queryFn: () => base44.entities.JobRequest.filter({ customer_email: user?.email }, '-created_date'),
    enabled: !!user?.email,
  });

  const { data: quotes = [] } = useQuery({
    queryKey: ['quotesForJobs', user?.email],
    queryFn: () => base44.entities.Quote.filter({ customer_email: user?.email }, '-created_date'),
    enabled: !!user?.email,
  });

  const cancelJobMutation = useMutation({
    mutationFn: (jobId) => base44.entities.JobRequest.update(jobId, { status: 'cancelled' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['myJobRequests']);
      toast.success(language === 'fr' ? 'Demande annulée' : 'Request cancelled');
      setShowCancelDialog(false);
      setSelectedJob(null);
    },
  });

  const acceptQuoteMutation = useMutation({
    mutationFn: async ({ quoteId, jobId }) => {
      await base44.entities.Quote.update(quoteId, { status: 'accepted' });
      await base44.entities.JobRequest.update(jobId, { status: 'accepted' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myJobRequests']);
      queryClient.invalidateQueries(['quotesForJobs']);
      toast.success(language === 'fr' ? 'Devis accepté' : 'Quote accepted');
    },
  });

  const getJobQuotes = (jobId) => {
    return quotes.filter(q => q.job_request_id === jobId);
  };

  const filterJobsByStatus = (status) => {
    if (status === 'all') return jobRequests;
    if (status === 'active') return jobRequests.filter(j => ['pending', 'quoted', 'accepted', 'in_progress'].includes(j.status));
    return jobRequests.filter(j => j.status === status);
  };

  const JobCard = ({ job }) => {
    const jobQuotes = getJobQuotes(job.id);
    const pendingQuotes = jobQuotes.filter(q => q.status === 'pending');

    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(job.created_date), 'PPP', { locale: language === 'fr' ? fr : enUS })}
                </p>
              </div>
              <Badge className={`${statusColors[job.status]} border`}>
                {t(`job.${job.status}`)}
              </Badge>
            </div>

            <p className="text-gray-600 line-clamp-2 mb-4">{job.description}</p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.commune}, {job.city}
              </span>
              {job.preferred_date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(job.preferred_date), 'PP', { locale: language === 'fr' ? fr : enUS })}
                </span>
              )}
              {job.budget_max && (
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {job.budget_min?.toLocaleString()} - {job.budget_max?.toLocaleString()} FCFA
                </span>
              )}
            </div>

            {pendingQuotes.length > 0 && (
              <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-800">
                  {pendingQuotes.length} {language === 'fr' ? 'nouveau(x) devis reçu(s)' : 'new quote(s) received'}
                </p>
              </div>
            )}
          </div>

          <div className="flex sm:flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedJob(job)}
              className="flex-1 sm:flex-none"
            >
              <Eye className="h-4 w-4 mr-2" />
              {t('common.view')}
            </Button>
            {['pending', 'quoted'].includes(job.status) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedJob(job);
                  setShowCancelDialog(true);
                }}
                className="flex-1 sm:flex-none text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4 mr-2" />
                {t('common.cancel')}
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('nav.myJobs')}</h1>
              <p className="text-gray-500 mt-1">
                {jobRequests.length} {language === 'fr' ? 'demande(s) au total' : 'total request(s)'}
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600" asChild>
              <Link to={createPageUrl('Workers')}>
                {language === 'fr' ? 'Nouvelle demande' : 'New Request'}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              {language === 'fr' ? 'Toutes' : 'All'} ({jobRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              {language === 'fr' ? 'Actives' : 'Active'} ({filterJobsByStatus('active').length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              {language === 'fr' ? 'Terminées' : 'Completed'} ({filterJobsByStatus('completed').length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              {language === 'fr' ? 'Annulées' : 'Cancelled'} ({filterJobsByStatus('cancelled').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterJobsByStatus('all').map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            {filterJobsByStatus('active').map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {filterJobsByStatus('completed').map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>
          <TabsContent value="cancelled" className="space-y-4">
            {filterJobsByStatus('cancelled').map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>
        </Tabs>
      </div>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob && !showCancelDialog} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">{t('job.description')}</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('job.location')}</p>
                  <p className="font-medium">{selectedJob.commune}, {selectedJob.city}</p>
                </div>
                {selectedJob.preferred_date && (
                  <div>
                    <p className="text-sm text-gray-500">{t('job.preferredDate')}</p>
                    <p className="font-medium">
                      {format(new Date(selectedJob.preferred_date), 'PPP', { locale: language === 'fr' ? fr : enUS })}
                    </p>
                  </div>
                )}
              </div>

              {/* Quotes */}
              <div>
                <h3 className="font-medium mb-3">{language === 'fr' ? 'Devis reçus' : 'Received Quotes'}</h3>
                {getJobQuotes(selectedJob.id).length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    {language === 'fr' ? 'Aucun devis pour le moment' : 'No quotes yet'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {getJobQuotes(selectedJob.id).map(quote => (
                      <Card key={quote.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-lg">{quote.amount?.toLocaleString()} FCFA</p>
                          <Badge className={statusColors[quote.status]}>
                            {language === 'fr' ? (quote.status === 'pending' ? 'En attente' : 'Accepté') : quote.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{quote.description}</p>
                        <p className="text-xs text-gray-500">
                          {language === 'fr' ? 'Durée estimée:' : 'Estimated duration:'} {quote.estimated_duration}
                        </p>
                        {quote.status === 'pending' && (
                          <Button
                            size="sm"
                            className="mt-3 bg-green-600 hover:bg-green-700"
                            onClick={() => acceptQuoteMutation.mutate({ quoteId: quote.id, jobId: selectedJob.id })}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {t('quote.accept')}
                          </Button>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'fr' ? 'Annuler la demande' : 'Cancel Request'}</DialogTitle>
            <DialogDescription>
              {language === 'fr' 
                ? 'Êtes-vous sûr de vouloir annuler cette demande ?'
                : 'Are you sure you want to cancel this request?'
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              {language === 'fr' ? 'Non, garder' : 'No, keep it'}
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedJob && cancelJobMutation.mutate(selectedJob.id)}
              disabled={cancelJobMutation.isPending}
            >
              {cancelJobMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                language === 'fr' ? 'Oui, annuler' : 'Yes, cancel'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}