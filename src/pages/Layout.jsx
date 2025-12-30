
import React from 'react';
import { LanguageProvider } from '../components/i18n/LanguageContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children, currentPageName }) {
  const noLayoutPages = ['Login', 'Register', 'ForgotPassword'];
  const noFooterPages = ['Messages', 'Dashboard', 'WorkerDashboard', 'AdminDashboard'];
  
  const hideLayout = noLayoutPages.includes(currentPageName);
  const hideFooter = noFooterPages.includes(currentPageName);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <style>{`
          :root {
            --color-primary: #f97316;
            --color-primary-dark: #ea580c;
            --color-primary-light: #fed7aa;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Focus styles */
          *:focus-visible {
            outline: 2px solid #f97316;
            outline-offset: 2px;
          }
        `}</style>
        
        {!hideLayout && <Header />}
        
        <main className={`flex-1 ${!hideLayout ? 'pt-16 md:pt-20' : ''}`}>
          {children}
        </main>
        
        {!hideLayout && !hideFooter && <Footer />}
        
        <Toaster position="top-right" richColors />
      </div>
    </LanguageProvider>
  );
}
