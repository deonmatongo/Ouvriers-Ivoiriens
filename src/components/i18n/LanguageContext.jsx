import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      categories: "Catégories",
      workers: "Trouver un Ouvrier",
      howItWorks: "Comment ça marche",
      pricing: "Tarifs",
      about: "À propos",
      contact: "Contact",
      login: "Connexion",
      register: "Inscription",
      dashboard: "Tableau de bord",
      logout: "Déconnexion",
      profile: "Profil",
      messages: "Messages",
      myJobs: "Mes travaux",
      settings: "Paramètres"
    },
    // Home page
    home: {
      heroTitle: "Trouvez les meilleurs artisans en Côte d'Ivoire",
      heroSubtitle: "Connectez-vous avec des professionnels qualifiés pour tous vos travaux",
      searchPlaceholder: "De quel service avez-vous besoin ?",
      locationPlaceholder: "Ville ou commune",
      searchButton: "Rechercher",
      popularCategories: "Catégories populaires",
      topWorkers: "Meilleurs Ouvriers",
      howItWorks: "Comment ça marche",
      viewAll: "Voir tout",
      featuredWorkers: "Ouvriers en vedette",
      testimonials: "Témoignages"
    },
    // Categories
    categories: {
      plumbing: "Plomberie",
      electrical: "Électricité",
      carpentry: "Menuiserie",
      painting: "Peinture",
      masonry: "Maçonnerie",
      cleaning: "Nettoyage",
      gardening: "Jardinage",
      airConditioning: "Climatisation",
      roofing: "Toiture",
      welding: "Soudure",
      tiling: "Carrelage",
      moving: "Déménagement"
    },
    // Worker profile
    worker: {
      verified: "Vérifié",
      available: "Disponible",
      busy: "Occupé",
      unavailable: "Indisponible",
      yearsExp: "ans d'expérience",
      jobsCompleted: "travaux réalisés",
      responseTime: "Temps de réponse",
      hours: "heures",
      contactWorker: "Contacter",
      requestQuote: "Demander un devis",
      reviews: "Avis",
      portfolio: "Portfolio",
      services: "Services",
      about: "À propos",
      location: "Localisation",
      skills: "Compétences",
      languages: "Langues",
      memberSince: "Membre depuis",
      rating: "Évaluation",
      priceRange: "Fourchette de prix"
    },
    // Job request
    job: {
      title: "Titre du travail",
      description: "Description",
      category: "Catégorie",
      location: "Localisation",
      preferredDate: "Date souhaitée",
      preferredTime: "Horaire préféré",
      morning: "Matin",
      afternoon: "Après-midi",
      evening: "Soir",
      flexible: "Flexible",
      budget: "Budget",
      urgency: "Urgence",
      low: "Faible",
      normal: "Normal",
      urgent: "Urgent",
      submit: "Envoyer la demande",
      pending: "En attente",
      quoted: "Devis reçu",
      accepted: "Accepté",
      inProgress: "En cours",
      completed: "Terminé",
      cancelled: "Annulé",
      disputed: "Litige"
    },
    // Quote
    quote: {
      amount: "Montant",
      laborCost: "Main d'œuvre",
      materialsCost: "Matériaux",
      materialsIncluded: "Matériaux inclus",
      estimatedDuration: "Durée estimée",
      validUntil: "Valide jusqu'au",
      accept: "Accepter",
      reject: "Refuser",
      sendQuote: "Envoyer le devis",
      viewQuote: "Voir le devis"
    },
    // Reviews
    review: {
      writeReview: "Écrire un avis",
      quality: "Qualité",
      punctuality: "Ponctualité",
      communication: "Communication",
      value: "Rapport qualité-prix",
      overall: "Note globale",
      comment: "Commentaire",
      submit: "Publier l'avis",
      noReviews: "Aucun avis pour le moment"
    },
    // Messages
    messages: {
      conversations: "Conversations",
      noMessages: "Aucun message",
      typeMessage: "Écrivez votre message...",
      send: "Envoyer",
      attachFile: "Joindre un fichier"
    },
    // Dashboard
    dashboard: {
      welcome: "Bienvenue",
      overview: "Vue d'ensemble",
      activeJobs: "Travaux actifs",
      pendingQuotes: "Devis en attente",
      completedJobs: "Travaux terminés",
      earnings: "Revenus",
      recentActivity: "Activité récente",
      quickActions: "Actions rapides",
      viewProfile: "Voir le profil",
      editProfile: "Modifier le profil",
      manageServices: "Gérer les services"
    },
    // Common
    common: {
      loading: "Chargement...",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      view: "Voir",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      noResults: "Aucun résultat",
      seeMore: "Voir plus",
      seeLess: "Voir moins",
      required: "Requis",
      optional: "Optionnel",
      success: "Succès",
      error: "Erreur",
      confirm: "Confirmer",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      close: "Fermer",
      currency: "FCFA",
      perHour: "/heure",
      perDay: "/jour",
      perJob: "/travail"
    },
    // Auth
    auth: {
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      fullName: "Nom complet",
      phone: "Téléphone",
      forgotPassword: "Mot de passe oublié ?",
      rememberMe: "Se souvenir de moi",
      noAccount: "Pas de compte ?",
      hasAccount: "Déjà un compte ?",
      registerAsCustomer: "Je cherche un ouvrier",
      registerAsWorker: "Je suis un ouvrier",
      termsAgree: "J'accepte les conditions d'utilisation"
    },
    // Footer
    footer: {
      about: "À propos de nous",
      careers: "Carrières",
      press: "Presse",
      blog: "Blog",
      helpCenter: "Centre d'aide",
      safety: "Sécurité",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      forWorkers: "Pour les ouvriers",
      becomeWorker: "Devenir ouvrier",
      resources: "Ressources",
      community: "Communauté",
      followUs: "Suivez-nous",
      copyright: "© 2024 Ouvriers-Ivoiriens. Tous droits réservés."
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      categories: "Categories",
      workers: "Find a Worker",
      howItWorks: "How It Works",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Sign Up",
      dashboard: "Dashboard",
      logout: "Logout",
      profile: "Profile",
      messages: "Messages",
      myJobs: "My Jobs",
      settings: "Settings"
    },
    // Home page
    home: {
      heroTitle: "Find the Best Artisans in Côte d'Ivoire",
      heroSubtitle: "Connect with qualified professionals for all your projects",
      searchPlaceholder: "What service do you need?",
      locationPlaceholder: "City or commune",
      searchButton: "Search",
      popularCategories: "Popular Categories",
      topWorkers: "Top Workers",
      howItWorks: "How It Works",
      viewAll: "View All",
      featuredWorkers: "Featured Workers",
      testimonials: "Testimonials"
    },
    // Categories
    categories: {
      plumbing: "Plumbing",
      electrical: "Electrical",
      carpentry: "Carpentry",
      painting: "Painting",
      masonry: "Masonry",
      cleaning: "Cleaning",
      gardening: "Gardening",
      airConditioning: "Air Conditioning",
      roofing: "Roofing",
      welding: "Welding",
      tiling: "Tiling",
      moving: "Moving"
    },
    // Worker profile
    worker: {
      verified: "Verified",
      available: "Available",
      busy: "Busy",
      unavailable: "Unavailable",
      yearsExp: "years experience",
      jobsCompleted: "jobs completed",
      responseTime: "Response time",
      hours: "hours",
      contactWorker: "Contact",
      requestQuote: "Request Quote",
      reviews: "Reviews",
      portfolio: "Portfolio",
      services: "Services",
      about: "About",
      location: "Location",
      skills: "Skills",
      languages: "Languages",
      memberSince: "Member since",
      rating: "Rating",
      priceRange: "Price Range"
    },
    // Job request
    job: {
      title: "Job Title",
      description: "Description",
      category: "Category",
      location: "Location",
      preferredDate: "Preferred Date",
      preferredTime: "Preferred Time",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      flexible: "Flexible",
      budget: "Budget",
      urgency: "Urgency",
      low: "Low",
      normal: "Normal",
      urgent: "Urgent",
      submit: "Submit Request",
      pending: "Pending",
      quoted: "Quoted",
      accepted: "Accepted",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
      disputed: "Disputed"
    },
    // Quote
    quote: {
      amount: "Amount",
      laborCost: "Labor Cost",
      materialsCost: "Materials Cost",
      materialsIncluded: "Materials Included",
      estimatedDuration: "Estimated Duration",
      validUntil: "Valid Until",
      accept: "Accept",
      reject: "Reject",
      sendQuote: "Send Quote",
      viewQuote: "View Quote"
    },
    // Reviews
    review: {
      writeReview: "Write a Review",
      quality: "Quality",
      punctuality: "Punctuality",
      communication: "Communication",
      value: "Value for Money",
      overall: "Overall Rating",
      comment: "Comment",
      submit: "Submit Review",
      noReviews: "No reviews yet"
    },
    // Messages
    messages: {
      conversations: "Conversations",
      noMessages: "No messages",
      typeMessage: "Type your message...",
      send: "Send",
      attachFile: "Attach file"
    },
    // Dashboard
    dashboard: {
      welcome: "Welcome",
      overview: "Overview",
      activeJobs: "Active Jobs",
      pendingQuotes: "Pending Quotes",
      completedJobs: "Completed Jobs",
      earnings: "Earnings",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      viewProfile: "View Profile",
      editProfile: "Edit Profile",
      manageServices: "Manage Services"
    },
    // Common
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      noResults: "No results",
      seeMore: "See more",
      seeLess: "See less",
      required: "Required",
      optional: "Optional",
      success: "Success",
      error: "Error",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      currency: "XOF",
      perHour: "/hour",
      perDay: "/day",
      perJob: "/job"
    },
    // Auth
    auth: {
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      phone: "Phone",
      forgotPassword: "Forgot Password?",
      rememberMe: "Remember me",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      registerAsCustomer: "I'm looking for a worker",
      registerAsWorker: "I'm a worker",
      termsAgree: "I agree to the Terms of Service"
    },
    // Footer
    footer: {
      about: "About Us",
      careers: "Careers",
      press: "Press",
      blog: "Blog",
      helpCenter: "Help Center",
      safety: "Safety",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      forWorkers: "For Workers",
      becomeWorker: "Become a Worker",
      resources: "Resources",
      community: "Community",
      followUs: "Follow Us",
      copyright: "© 2024 Ouvriers-Ivoiriens. All rights reserved."
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred_language');
      if (saved) return saved;
      const browserLang = navigator.language.substring(0, 2);
      return browserLang === 'fr' ? 'fr' : 'en';
    }
    return 'fr';
  });

  useEffect(() => {
    localStorage.setItem('preferred_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;