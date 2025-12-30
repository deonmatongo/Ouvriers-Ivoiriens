// Dummy data service to replace base44 API calls

// Generate dummy user
const getDummyUser = () => ({
  id: 'user-1',
  email: 'user@example.com',
  full_name: 'John Doe',
  phone: '+225 07 00 00 00 00',
  city: 'Abidjan',
  commune: 'Cocody',
  profile_photo: null,
  user_type: 'customer',
  preferred_language: 'fr',
  notification_preferences: { email: true, sms: true, push: true },
  created_date: new Date().toISOString(),
});

// Dummy workers data
const dummyWorkers = [
  {
    id: 'worker-1',
    user_email: 'worker1@example.com',
    full_name: 'Jean Kouassi',
    phone: '+225 07 11 11 11 11',
    bio: 'Plombier expérimenté avec plus de 10 ans d\'expérience. Spécialisé dans la réparation de fuites et l\'installation de systèmes sanitaires.',
    skills: ['plumbing', 'masonry'],
    city: 'Abidjan',
    commune: 'Cocody',
    experience_years: 10,
    languages: ['Français', 'Anglais'],
    profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    portfolio_images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80',
    ],
    status: 'active',
    is_verified: true,
    availability: 'available',
    rating_average: 4.8,
    rating_count: 45,
    jobs_completed: 120,
    response_time_hours: 2,
    created_date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'worker-2',
    user_email: 'worker2@example.com',
    full_name: 'Marie Traoré',
    phone: '+225 07 22 22 22 22',
    bio: 'Électricienne professionnelle certifiée. Installation et réparation de systèmes électriques résidentiels et commerciaux.',
    skills: ['electrical'],
    city: 'Abidjan',
    commune: 'Plateau',
    experience_years: 8,
    languages: ['Français'],
    profile_photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    portfolio_images: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80',
    ],
    status: 'active',
    is_verified: true,
    availability: 'available',
    rating_average: 4.9,
    rating_count: 38,
    jobs_completed: 95,
    response_time_hours: 1,
    created_date: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'worker-3',
    user_email: 'worker3@example.com',
    full_name: 'Amadou Diallo',
    phone: '+225 07 33 33 33 33',
    bio: 'Menuisier spécialisé dans la fabrication de meubles sur mesure et la rénovation.',
    skills: ['carpentry', 'painting'],
    city: 'Abidjan',
    commune: 'Yopougon',
    experience_years: 12,
    languages: ['Français'],
    profile_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    portfolio_images: [],
    status: 'active',
    is_verified: false,
    availability: 'available',
    rating_average: 4.5,
    rating_count: 22,
    jobs_completed: 67,
    response_time_hours: 3,
    created_date: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Dummy job requests
const dummyJobRequests = [
  {
    id: 'job-1',
    customer_email: 'user@example.com',
    worker_id: 'worker-1',
    title: 'Réparation fuite d\'eau',
    description: 'Fuite d\'eau dans la salle de bain, besoin d\'intervention urgente.',
    category_id: 'plumbing',
    city: 'Abidjan',
    commune: 'Cocody',
    location: 'Rue des Jardins',
    preferred_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    preferred_time: 'morning',
    budget_min: 50000,
    budget_max: 100000,
    urgency: 'urgent',
    status: 'pending',
    images: [],
    created_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'job-2',
    customer_email: 'user@example.com',
    worker_id: 'worker-2',
    title: 'Installation électrique',
    description: 'Installation de prises électriques dans une nouvelle pièce.',
    category_id: 'electrical',
    city: 'Abidjan',
    commune: 'Plateau',
    location: 'Avenue de la République',
    preferred_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    preferred_time: 'afternoon',
    budget_min: 100000,
    budget_max: 200000,
    urgency: 'normal',
    status: 'quoted',
    images: [],
    created_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Dummy quotes
const dummyQuotes = [
  {
    id: 'quote-1',
    job_request_id: 'job-2',
    customer_email: 'user@example.com',
    worker_id: 'worker-2',
    amount: 150000,
    description: 'Installation complète avec matériaux de qualité.',
    estimated_duration: '2-3 heures',
    status: 'pending',
    created_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Dummy conversations
const dummyConversations = [
  {
    id: 'conv-1',
    participant_1: 'user@example.com',
    participant_2: 'worker1@example.com',
    last_message: 'Merci pour votre réponse rapide!',
    last_message_date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    unread_count_1: 0,
    unread_count_2: 1,
    created_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Dummy messages
const dummyMessages = [
  {
    id: 'msg-1',
    conversation_id: 'conv-1',
    sender_email: 'worker1@example.com',
    receiver_email: 'user@example.com',
    content: 'Bonjour, je peux intervenir demain matin.',
    is_read: true,
    message_type: 'text',
    created_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-2',
    conversation_id: 'conv-1',
    sender_email: 'user@example.com',
    receiver_email: 'worker1@example.com',
    content: 'Merci pour votre réponse rapide!',
    is_read: true,
    message_type: 'text',
    created_date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

// Dummy reviews
const dummyReviews = [
  {
    id: 'review-1',
    worker_id: 'worker-1',
    customer_email: 'customer1@example.com',
    rating: 5,
    comment: 'Excellent travail, très professionnel!',
    status: 'approved',
    created_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth service
export const auth = {
  isAuthenticated: async () => {
    await delay(300);
    // Simulate being authenticated
    return true;
  },
  
  me: async () => {
    await delay(300);
    return getDummyUser();
  },
  
  updateMe: async (data) => {
    await delay(500);
    return { ...getDummyUser(), ...data };
  },
  
  logout: () => {
    // Just clear any local state if needed
    console.log('Logged out');
  },
  
  redirectToLogin: (returnUrl) => {
    // In a real app, this would redirect to login
    console.log('Redirect to login', returnUrl);
    // For demo purposes, we'll just log it
  },
};

// Entities service
const createEntityService = (entityName, dummyData) => ({
  filter: async (query = {}, sortField = '-created_date', limit = 50) => {
    await delay(500);
    let results = [...dummyData];
    
    // Apply filters
    Object.keys(query).forEach(key => {
      if (query[key] !== undefined && query[key] !== null && query[key] !== '') {
        if (Array.isArray(query[key])) {
          results = results.filter(item => 
            Array.isArray(item[key]) && item[key].some(val => query[key].includes(val))
          );
        } else if (key === 'is_verified' || key === 'status' || key === 'participant_1' || key === 'participant_2' || key === 'conversation_id' || key === 'worker_id') {
          results = results.filter(item => item[key] === query[key]);
        } else if (key === 'customer_email') {
          results = results.filter(item => item[key] === query[key]);
        } else {
          results = results.filter(item => 
            item[key]?.toString().toLowerCase().includes(query[key].toString().toLowerCase())
          );
        }
      }
    });
    
    // Apply sorting
    if (sortField) {
      const isDesc = sortField.startsWith('-');
      const field = isDesc ? sortField.substring(1) : sortField;
      results.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (aVal === bVal) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        // Handle date comparison
        if (field.includes('date') || field.includes('Date')) {
          const aDate = new Date(aVal);
          const bDate = new Date(bVal);
          const comparison = aDate > bDate ? 1 : -1;
          return isDesc ? -comparison : comparison;
        }
        const comparison = aVal > bVal ? 1 : -1;
        return isDesc ? -comparison : comparison;
      });
    }
    
    return results.slice(0, limit);
  },
  
  create: async (data) => {
    await delay(500);
    const newItem = {
      id: `${entityName}-${Date.now()}`,
      ...data,
      created_date: new Date().toISOString(),
    };
    dummyData.push(newItem);
    return newItem;
  },
  
  update: async (id, data) => {
    await delay(500);
    const index = dummyData.findIndex(item => item.id === id);
    if (index !== -1) {
      dummyData[index] = { ...dummyData[index], ...data };
      return dummyData[index];
    }
    throw new Error('Not found');
  },
  
  delete: async (id) => {
    await delay(500);
    const index = dummyData.findIndex(item => item.id === id);
    if (index !== -1) {
      dummyData.splice(index, 1);
      return { success: true };
    }
    throw new Error('Not found');
  },
});

export const entities = {
  Worker: createEntityService('worker', dummyWorkers),
  JobRequest: createEntityService('job', dummyJobRequests),
  Quote: createEntityService('quote', dummyQuotes),
  Conversation: createEntityService('conversation', dummyConversations),
  Message: createEntityService('message', dummyMessages),
  Review: createEntityService('review', dummyReviews),
  Category: {
    filter: async () => {
      await delay(300);
      return [
        { id: 'plumbing', name: 'Plomberie', name_en: 'Plumbing' },
        { id: 'electrical', name: 'Électricité', name_en: 'Electrical' },
        { id: 'carpentry', name: 'Menuiserie', name_en: 'Carpentry' },
        { id: 'painting', name: 'Peinture', name_en: 'Painting' },
        { id: 'masonry', name: 'Maçonnerie', name_en: 'Masonry' },
        { id: 'cleaning', name: 'Nettoyage', name_en: 'Cleaning' },
        { id: 'gardening', name: 'Jardinage', name_en: 'Gardening' },
        { id: 'airConditioning', name: 'Climatisation', name_en: 'Air Conditioning' },
      ];
    },
  },
};

// Integrations service
export const integrations = {
  Core: {
    UploadFile: async ({ file }) => {
      await delay(1000);
      // Return a dummy URL - in a real app this would be an actual uploaded file URL
      return {
        file_url: URL.createObjectURL(file),
      };
    },
    InvokeLLM: async (prompt) => {
      await delay(1000);
      return { response: 'Dummy LLM response' };
    },
    SendEmail: async (data) => {
      await delay(500);
      return { success: true };
    },
    GenerateImage: async (prompt) => {
      await delay(2000);
      return { image_url: 'https://via.placeholder.com/512' };
    },
    ExtractDataFromUploadedFile: async (file) => {
      await delay(1500);
      return { data: {} };
    },
    CreateFileSignedUrl: async (filePath) => {
      await delay(300);
      return { signed_url: `https://example.com/${filePath}` };
    },
    UploadPrivateFile: async ({ file }) => {
      await delay(1000);
      return { file_url: URL.createObjectURL(file) };
    },
  },
};

// Export a client-like object that matches base44 structure
export const dummyClient = {
  auth,
  entities,
  integrations,
};

