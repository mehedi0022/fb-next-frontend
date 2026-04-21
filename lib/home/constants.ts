// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  USERS: '/api/users',
  CATEGORIES: '/api/categories',
} as const;

// App configuration
export const APP_CONFIG = {
  SITE_NAME: 'Freelancer Bangladesh',
  SITE_DESCRIPTION: 'বাংলাদেশের সর্ববৃহৎ ড্রপশিপিং প্ল্যাটফর্ম',
  DEFAULT_CURRENCY: 'BDT',
  MAX_PRODUCTS_PER_PAGE: 20,
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { label: 'আমাদের সম্পর্কে', href: '/about' },
  { label: 'ক্যাটাগরি', href: '/categories' },
  { label: 'প্রোডাক্ট', href: '/products' },
  { label: 'যোগাযোগ', href: '/contact' },
] as const;