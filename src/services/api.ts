import axios from 'axios';
import { STORAGE_KEYS } from '@/utils/constants';
import type { User, DiseaseDetectionResult, WeatherData, Expert, MandiRate, Reminder, Consultation, DashboardStats } from '@/types';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  timeout: 30000,
});

export default API;

export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong. Please try again.'): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined;
    return data?.message || data?.error || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

// Request interceptor to add token
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
API.interceptors.response.use(
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
      const response = await API.post('/auth/login', { email, password });
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
    const response = await API.post('/auth/register', userData);
    const { user, token } = response.data.data;

    sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    return { user, token };
  },

  logout: async (): Promise<void> => {
    await API.post('/auth/logout');
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await API.get('/auth/me');
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
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await API.post('/disease/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data?.data || response.data;

      if (!data || response.data?.success === false) {
        throw new Error(response.data?.message || 'Disease analysis failed');
      }

      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Failed to analyze image.'));
    }
  },

  getDetectionHistory: async (): Promise<DiseaseDetectionResult[]> => {
    try {
      const response = await API.get('/disease/scans');
      const scans = Array.isArray(response.data?.data) ? response.data.data : [];
      return scans.map((scan: any) => ({
        ...scan,
        id: scan.id || scan._id,
        symptoms: Array.isArray(scan.symptoms) ? scan.symptoms : [],
        causes: Array.isArray(scan.causes) ? scan.causes : [],
        preventionTips: Array.isArray(scan.preventionTips) ? scan.preventionTips : [],
        treatmentSuggestions: Array.isArray(scan.treatmentSuggestions) ? scan.treatmentSuggestions : [],
        prevention: scan.prevention || '',
        treatment: scan.treatment || '',
        detectedAt: scan.detectedAt || scan.createdAt || new Date().toISOString(),
      }));
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Failed to load disease scan history.'));
    }
  },
};

export const weatherAPI = {
  getWeather: async (location: string): Promise<WeatherData> => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.allSettled([
        API.get(`/weather/${encodeURIComponent(location)}`),
        API.get(`/weather/forecast/${encodeURIComponent(location)}`),
      ]);

      if (weatherResponse.status === 'rejected') {
        throw weatherResponse.reason;
      }

      const data = weatherResponse.value.data?.data || {};
      const forecastData = forecastResponse.status === 'fulfilled'
        ? forecastResponse.value.data?.data?.forecast
        : [];

      return {
        location: data.city || location,
        current: {
          temperature: Number(data.temperature ?? 0),
          humidity: Number(data.humidity ?? 0),
          windSpeed: Number(data.windSpeed ?? 0),
          rainfall: Number(data.rainfall ?? 0),
          condition: data.description || 'Weather unavailable',
          icon: data.icon || '02d',
        },
        forecast: Array.isArray(forecastData)
          ? forecastData.map((item: any) => ({
              day: item?.date || '',
              temperature: Number(item?.temperature ?? 0),
              condition: item?.description || 'Weather unavailable',
              humidity: Number(item?.humidity ?? 0),
              rainfall: Number(item?.rainfall ?? 0),
              windSpeed: Number(item?.windSpeed ?? 0),
              icon: item?.icon || '02d',
            }))
          : [],
      };
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Failed to load weather data.'));
    }
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
    const normalizedQuery = query.toLowerCase();
    return locations.filter((l: string) => l.toLowerCase().includes(normalizedQuery));
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
    const response = await API.post('/experts/request', {
      issue: data.issueDescription,
      cropType: data.cropType,
      location: 'To be determined', // Would need to get from user
      preferredTime: `${data.scheduledDate} ${data.scheduledTime}`,
    });

    return response.data.data;
  },

  getConsultations: async (farmerId: string): Promise<Consultation[]> => {
    const response = await API.get('/experts/my-requests');
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

    const response = await API.get(url);
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
    const response = await API.get('/mandi');
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
    const response = await API.post('/contact', data);
    return response.data.data;
  },
};

export const careersAPI = {
  submitApplication: async (formData: FormData): Promise<any> => {
    const response = await API.post('/careers/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};

export const adminAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await API.get('/users');
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
    const response = await API.get(`/users/${id}`);
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
    const response = await API.put(`/users/${id}`, data);
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
    await API.delete(`/users/${id}`);
  },

  getAdminStats: async (): Promise<DashboardStats> => {
    const response = await API.get('/users/stats');
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
