import axios from 'axios';
import { STORAGE_KEYS } from '@/utils/constants';
import type { User, DiseaseDetectionResult, WeatherData, Expert, MandiRate, Reminder, Consultation, DashboardStats } from '@/types';

// Create axios instance
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
console.log('[API] Using backend URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear session on unauthorized
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    console.log('[AuthAPI] Attempting login for:', email);
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('[AuthAPI] Login response:', response.data);
      
      const { user, token } = response.data.data;

      sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
      sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      console.log('[AuthAPI] Token and user saved to sessionStorage');

      return { user, token };
    } catch (error: any) {
      console.error('[AuthAPI] Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  register: async (userData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    location: string;
    role?: string;
  }): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', userData);
    const { user, token } = response.data.data;

    sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    return { user, token };
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error) {
      return null;
    }
  },

  adminLogin: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // Admin login uses same endpoint
    return authAPI.login(email, password);
  },
};

export const diseaseAPI = {
  detectDisease: async (imageFile: File): Promise<DiseaseDetectionResult> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post('/disease/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  getDetectionHistory: async (): Promise<DiseaseDetectionResult[]> => {
    const response = await api.get('/disease/scans');
    return response.data.data;
  },
};

export const weatherAPI = {
  getWeather: async (location: string): Promise<WeatherData> => {
    const response = await api.get(`/weather/${encodeURIComponent(location)}`);
    const data = response.data.data;

    return {
      location: data.city,
      current: {
        temperature: data.temperature,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        rainfall: data.rainfall || 0,
        condition: data.description,
        icon: data.icon,
      },
      forecast: [], // Could be extended to use forecast endpoint
    };
  },

  searchLocation: async (query: string): Promise<string[]> => {
    // For now, return some common locations
    const locations = [
      'Ahmedabad, Gujarat',
      'Mumbai, Maharashtra',
      'Delhi, NCR',
      'Bangalore, Karnataka',
      'Chennai, Tamil Nadu',
      'Kolkata, West Bengal',
      'Hyderabad, Telangana',
      'Pune, Maharashtra',
      'Jaipur, Rajasthan',
      'Lucknow, Uttar Pradesh',
    ];
    return locations.filter((l: string) => l.toLowerCase().includes(query.toLowerCase()));
  },
};

export const expertsAPI = {
  getExperts: async (filters?: { specialization?: string; availability?: string }): Promise<Expert[]> => {
    // This would need to be implemented in backend
    // For now, return empty array
    return [];
  },

  getExpertById: async (id: string): Promise<Expert | null> => {
    // This would need to be implemented in backend
    return null;
  },

  bookConsultation: async (data: {
    expertId: string;
    farmerId: string;
    scheduledDate: string;
    scheduledTime: string;
    issueDescription: string;
    cropType: string;
  }): Promise<Consultation> => {
    const response = await api.post('/experts/request', {
      issue: data.issueDescription,
      cropType: data.cropType,
      location: 'To be determined', // Would need to get from user
      preferredTime: `${data.scheduledDate} ${data.scheduledTime}`,
    });

    return response.data.data;
  },

  getConsultations: async (farmerId: string): Promise<Consultation[]> => {
    const response = await api.get('/experts/my-requests');
    return response.data.data.map((req: any) => ({
      id: req._id,
      expertId: req.assignedExpert?._id || '',
      farmerId: req.farmer._id,
      expertName: req.assignedExpert?.fullName || 'Not assigned',
      expertAvatar: req.assignedExpert?.avatar || '',
      farmerName: req.farmer.fullName,
      status: req.status,
      scheduledDate: req.preferredTime.split(' ')[0],
      scheduledTime: req.preferredTime.split(' ')[1] || '',
      issueDescription: req.issue,
      issueImages: [],
      cropType: req.cropType,
      notes: req.notes,
      createdAt: req.createdAt,
    }));
  },
};

export const mandiAPI = {
  getRates: async (filters?: { crop?: string; location?: string }): Promise<MandiRate[]> => {
    let url = '/mandi';
    if (filters?.crop) {
      url = `/mandi/crop/${encodeURIComponent(filters.crop)}`;
    } else if (filters?.location) {
      url = `/mandi/region/${encodeURIComponent(filters.location)}`;
    }

    const response = await api.get(url);
    return response.data.data.map((rate: any) => ({
      id: `${rate.crop}_${rate.market}_${Date.now()}`,
      cropName: rate.crop,
      marketLocation: rate.market,
      price: rate.price,
      unit: rate.unit,
      change: rate.change,
      trend: rate.trend,
      region: rate.region,
      lastUpdated: new Date().toISOString(),
    }));
  },

  searchCrops: async (query: string): Promise<string[]> => {
    // Get all rates and extract unique crops
    const response = await api.get('/mandi');
    const rawCrops: string[] = response.data.data.map((r: any) => r.crop);
    const crops: string[] = [...new Set(rawCrops)];
    return crops.filter((c: string) => c.toLowerCase().includes(query.toLowerCase()));
  },
};

export const remindersAPI = {
  getReminders: async (): Promise<Reminder[]> => {
    // This would need to be implemented in backend
    // For now, return empty array
    return [];
  },

  createReminder: async (data: Omit<Reminder, 'id' | 'createdAt'>): Promise<Reminder> => {
    // This would need to be implemented in backend
    throw new Error('Reminders API not implemented yet');
  },

  updateReminder: async (id: string, data: Partial<Reminder>): Promise<Reminder> => {
    // This would need to be implemented in backend
    throw new Error('Reminders API not implemented yet');
  },

  deleteReminder: async (id: string): Promise<void> => {
    // This would need to be implemented in backend
    throw new Error('Reminders API not implemented yet');
  },
};

export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    // This would need to be implemented in backend
    // For now, return mock stats
    return {
      totalUsers: 0,
      totalScans: 0,
      healthyCrops: 0,
      diseaseDetected: 0,
      consultations: 0,
      activeFarmers: 0,
      diseaseReports: 0,
      totalReminders: 0,
      completedReminders: 0,
      marketUpdates: 0,
    };
  },

  getActivities: async (): Promise<any[]> => {
    // This would need to be implemented in backend
    return [];
  },
};

export const contactAPI = {
  submitContact: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<any> => {
    const response = await api.post('/contact', data);
    return response.data.data;
  },
};

export const careersAPI = {
  submitApplication: async (formData: FormData): Promise<any> => {
    const response = await api.post('/careers/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};

export const adminAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data.data.map((user: any) => ({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      location: user.location,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    }));
  },

  getUserById: async (id: string): Promise<User | null> => {
    const response = await api.get(`/users/${id}`);
    const user = response.data.data;
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      location: user.location,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    const user = response.data.data;
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      location: user.location,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  getAdminStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/users/stats');
    const stats = response.data.data;
    return {
      totalUsers: stats.totalUsers,
      activeFarmers: stats.farmers,
      diseaseReports: 0,
      totalScans: 0,
      healthyCrops: 0,
      diseaseDetected: 0,
      consultations: 0,
      totalReminders: 0,
      completedReminders: 0,
      marketUpdates: 0,
    };
  },
};
