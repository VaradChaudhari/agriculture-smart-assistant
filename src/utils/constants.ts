export const APP_NAME = 'Agriculture Smart Assistant';
export const APP_DOMAIN = 'agriculture-smart.in';
export const API_BASE_URL = 'https://api.agriculture-smart.in/v1';

export const STORAGE_KEYS = {
  TOKEN: 'asa_token',
  USER: 'asa_user',
  THEME: 'asa_theme',
  REMEMBER_ME: 'asa_remember_email',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DISEASE_DETECTION: '/disease-detection',
  WEATHER: '/weather',
  EXPERTS: '/experts',
  MANDI_RATES: '/mandi-rates',
  REMINDERS: '/reminders',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
} as const;

export const SIDEBAR_LINKS = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { name: 'Disease Detection', href: ROUTES.DISEASE_DETECTION, icon: 'ScanLine' },
  { name: 'Weather', href: ROUTES.WEATHER, icon: 'CloudSun' },
  { name: 'Experts', href: ROUTES.EXPERTS, icon: 'Users' },
  { name: 'Mandi Rates', href: ROUTES.MANDI_RATES, icon: 'TrendingUp' },
  { name: 'Reminders', href: ROUTES.REMINDERS, icon: 'Bell' },
] as const;

export const REMINDER_TYPES = [
  { value: 'watering', label: 'Watering', color: 'blue' },
  { value: 'fertilizer', label: 'Fertilizer', color: 'emerald' },
  { value: 'pesticide', label: 'Pesticide', color: 'red' },
  { value: 'harvesting', label: 'Harvesting', color: 'amber' },
  { value: 'irrigation', label: 'Irrigation', color: 'cyan' },
] as const;

export const CROP_TYPES = [
  'Rice',
  'Wheat',
  'Cotton',
  'Sugarcane',
  'Maize',
  'Soybean',
  'Groundnut',
  'Mustard',
  'Potato',
  'Tomato',
  'Onion',
  'Chili',
  'Brinjal',
  'Okra',
  'Cauliflower',
  'Cabbage',
  'Carrot',
  'Peas',
  'Gram',
  'Lentil',
] as const;

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;

export const EXPERT_SPECIALIZATIONS = [
  'Crop Disease Management',
  'Soil Health & Fertility',
  'Irrigation Management',
  'Pest Control',
  'Organic Farming',
  'Horticulture',
  'Agricultural Economics',
  'Farm Machinery',
  'Seed Technology',
  'Climate Smart Agriculture',
] as const;
