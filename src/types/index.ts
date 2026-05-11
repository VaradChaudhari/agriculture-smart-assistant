export interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  location: string;
  role: 'farmer' | 'expert' | 'admin';
  avatar?: string;
  status?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DiseaseDetectionResult {
  id: string;
  _id?: string;
  user?: string;
  imageUrl?: string;
  cropName?: string;
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  symptoms: string[];
  causes: string[];
  preventionTips: string[];
  treatmentSuggestions: string[];
  prevention: string;
  treatment: string;
  description?: string;
  aiModel?: string;
  detectedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WeatherData {
  location?: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    rainfall: number;
    condition: string;
    icon?: string;
  };
  forecast?: Array<{
    day: string;
    temperature: number;
    condition: string;
    humidity?: number;
    rainfall?: number;
    windSpeed?: number;
    icon?: string;
  }>;
}

export interface Expert {
  id: string;
  name: string;
  avatar: string;
  specialization: string[];
  experience: number;
  rating: number;
  totalConsultations: number;
  languages: string[];
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  education: string;
  consultationFee: number;
}

export interface MandiRate {
  id: string;
  cropName: string;
  crop?: string;
  market: string;
  state?: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  price?: number;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  changePercentage: number;
  region?: string;
  updatedAt?: string;
  lastUpdated?: string;
}

export interface Reminder {
  id: string;
  title: string;
  type: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: string;
  createdAt: string;
}

export interface Consultation {
  id: string;
  expertId: string;
  farmerId: string;
  expertName: string;
  expertAvatar: string;
  farmerName: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  issueDescription: string;
  issueImages: string[];
  cropType: string;
  notes: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers?: number;
  activeFarmers?: number;
  diseaseReports?: number;
  totalScans: number;
  healthyCrops: number;
  diseaseDetected: number;
  consultations: number;
  totalReminders?: number;
  completedReminders?: number;
  marketUpdates?: number;
}

export interface Activity {
  id: string;
  type: 'disease_scan' | 'consultation' | 'reminder' | 'market_check' | 'weather_check';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}
