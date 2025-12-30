import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../components/i18n/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Paperclip, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  File,
  Loader2,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

export default function Messages() {
  const { t, language } = useLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const conversationId = urlParams.get('id');
  
  const [user, setUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileList, setShowMobileList] = useState(!conversationId);
  const messagesEndRef = useRef(null);
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

  const { data: conversations = [], isLoading: loadingConversations } = useQuery({
    queryKey: ['conversations', user?.email],
    queryFn: async () => {
      const conv1 = await base44.entities.Conversation.filter({ participant_1: user?.email }, '-last_message_date');
      const conv2 = await base44.entities.Conversation.filter({ participant_2: user?.email }, '-last_message_date');
      return [...conv1, ...conv2].sort((a, b) => 
        new Date(b.last_message_date || b.created_date) - new Date(a.last_message_date || a.created_date)
      );
    },
    enabled: !!user?.email,
  });

  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ['messages', selectedConversation?.id],
    queryFn: () => base44.entities.Message.filter(
      { conversation_id: selectedConversation?.id }, 
      'created_date'
    ),
    enabled: !!selectedConversation?.id,
    refetchInterval: 5000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content) => {
      const otherParticipant = selectedConversation.participant_1 === user.email 
        ? selectedConversation.participant_2 
        : selectedConversation.participant_1;

      await base44.entities.Message.create({
        conversation_id: selectedConversation.id,
        sender_email: user.email,
        receiver_email: otherParticipant,
        content: content,
        is_read: false,
        message_type: 'text',
      });

      await base44.entities.Conversation.update(selectedConversation.id, {
        last_message: content,
        last_message_date: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', selectedConversation?.id]);
      queryClient.invalidateQueries(['conversations']);
      setNewMessage('');
    },
  });

  useEffect(() => {
    if (conversationId && conversations.length > 0) {
      const conv = conversations.find(c => c.id === conversationId);
      if (conv) setSelectedConversation(conv);
    }
  }, [conversationId, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    sendMessageMutation.mutate(newMessage);
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participant_1 === user?.email 
      ? conversation.participant_2 
      : conversation.participant_1;
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const other = getOtherParticipant(conv);
    return other?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-6">
        <div className="bg-white rounded-none sm:rounded-2xl shadow-sm overflow-hidden flex h-[calc(100vh-5rem)] sm:h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <div className={`w-full md:w-80 lg:w-96 border-r flex-shrink-0 flex flex-col ${
            selectedConversation && !showMobileList ? 'hidden md:flex' : 'flex'
          }`}>
            {/* Header */}
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-4">{t('messages.conversations')}</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              {loadingConversations ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <p className="text-gray-500">{t('messages.noMessages')}</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.map((conv) => {
                    const other = getOtherParticipant(conv);
                    const isActive = selectedConversation?.id === conv.id;
                    const unreadCount = conv.participant_1 === user?.email 
                      ? conv.unread_count_1 
                      : conv.unread_count_2;

                    return (
                      <button
                        key={conv.id}
                        onClick={() => {
                          setSelectedConversation(conv);
                          setShowMobileList(false);
                        }}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                          isActive ? 'bg-orange-50' : ''
                        }`}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {other?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-gray-900 truncate">
                              {other?.split('@')[0]}
                            </p>
                            {conv.last_message_date && (
                              <span className="text-xs text-gray-400">
                                {format(new Date(conv.last_message_date), 'HH:mm', {
                                  locale: language === 'fr' ? fr : enUS
                                })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conv.last_message}</p>
                        </div>
                        {unreadCount > 0 && (
                          <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${
            !selectedConversation || showMobileList ? 'hidden md:flex' : 'flex'
          }`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setShowMobileList(true)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {getOtherParticipant(selectedConversation)?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {getOtherParticipant(selectedConversation)?.split('@')[0]}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'fr' ? 'En ligne' : 'Online'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  {loadingMessages ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {messages.map((message, index) => {
                          const isOwn = message.sender_email === user?.email;
                          const showDate = index === 0 || 
                            format(new Date(messages[index - 1].created_date), 'yyyy-MM-dd') !== 
                            format(new Date(message.created_date), 'yyyy-MM-dd');

                          return (
                            <React.Fragment key={message.id}>
                              {showDate && (
                                <div className="text-center">
                                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                    {format(new Date(message.created_date), 'PPPP', {
                                      locale: language === 'fr' ? fr : enUS
                                    })}
                                  </span>
                                </div>
                              )}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`max-w-[75%] ${
                                  isOwn 
                                    ? 'bg-orange-500 text-white rounded-2xl rounded-br-md' 
                                    : 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md'
                                } px-4 py-2.5`}>
                                  <p className="text-sm">{message.content}</p>
                                  <p className={`text-xs mt-1 ${isOwn ? 'text-orange-100' : 'text-gray-400'}`}>
                                    {format(new Date(message.created_date), 'HH:mm')}
                                  </p>
                                </div>
                              </motion.div>
                            </React.Fragment>
                          );
                        })}
                      </AnimatePresence>
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5 text-gray-400" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t('messages.typeMessage')}
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      disabled={!newMessage.trim() || sendMessageMutation.isPending}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {sendMessageMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    {language === 'fr' 
                      ? 'Sélectionnez une conversation' 
                      : 'Select a conversation'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}