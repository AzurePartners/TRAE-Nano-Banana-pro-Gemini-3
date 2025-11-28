import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for image processing
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data?.message);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data?.message);
    return Promise.reject(error);
  }
);

export interface TransformResponse {
  success: boolean;
  transformedImage?: string;
  mimeType?: string;
  style?: string;
  prompt?: string;
  isCustomPrompt?: boolean;
  message?: string;
  error?: string;
}

export const transformImage = async (
  imageFile: File, 
  style: string, 
  customPrompt?: string, 
  useCustomPrompt?: boolean
): Promise<TransformResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('style', style);
    if (useCustomPrompt && customPrompt) {
      formData.append('customPrompt', customPrompt);
      formData.append('useCustomPrompt', 'true');
    } else {
      formData.append('useCustomPrompt', 'false');
    }

    console.log(`🎨 Transforming image with style: ${style}`);

    const response = await api.post('/api/transform', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Image transformation failed:', error);
    
    if (error.response) {
      // Server responded with error
      return {
        success: false,
        message: error.response.data?.message || 'Server error occurred',
        error: error.response.data?.error || error.message,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        success: false,
        message: 'Cannot connect to server. Please ensure the backend is running.',
        error: 'Connection failed',
      };
    } else {
      // Something else happened
      return {
        success: false,
        message: 'An unexpected error occurred',
        error: error.message,
      };
    }
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/api/health');
    return response.data?.status === 'ok';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};