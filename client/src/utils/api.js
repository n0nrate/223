import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service functions
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const serversAPI = {
  fetchServers: async () => {
    const response = await api.get('/servers');
    return response.data;
  },
};

export const channelsAPI = {
  fetchChannels: async (serverId) => {
    const response = await api.get(`/servers/${serverId}/channels`);
    return response.data;
  },
};

export const messagesAPI = {
  fetchMessages: async (channelId) => {
    const response = await api.get(`/channels/${channelId}/messages`);
    return response.data;
  },
  sendMessage: async (channelId, content) => {
    const response = await api.post(`/channels/${channelId}/messages`, { content });
    return response.data;
  },
};

export default api;