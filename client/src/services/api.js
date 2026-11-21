import axios from 'axios';

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('cw_api_url');
    if (custom) return custom.trim().replace(/\/+$/, '');
  }
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl.trim().replace(/\/+$/, '');
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token and ensure clean baseURL
api.interceptors.request.use(
  (config) => {
    config.baseURL = getApiBaseUrl();
    const token = localStorage.getItem('cw_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't auto-clear on /me failures during initial boot
      const isAuthRoute = error.config.url.includes('/auth/login') || error.config.url.includes('/auth/register');
      if (!isAuthRoute && localStorage.getItem('cw_token')) {
        // Token expired or invalid
        localStorage.removeItem('cw_token');
        localStorage.removeItem('cw_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Wallet APIs (Encrypted keystore backup)
export const walletApi = {
  saveBackup: (walletAddress, encryptedKeystore) =>
    api.put('/wallet', { walletAddress, encryptedKeystore }),
  getBackup: () => api.get('/wallet'),
};

// Transactions APIs
export const transactionsApi = {
  save: (txData) => api.post('/transactions', txData),
  getAll: (asset) => api.get('/transactions', { params: { asset } }),
};

// Contacts APIs
export const contactsApi = {
  getAll: () => api.get('/contacts'),
  add: (data) => api.post('/contacts', data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// AI Agent APIs (ReAct Web3 Assistant)
export const agentApi = {
  chat: (message, activeWalletAddress) =>
    api.post('/agent/chat', { message, activeWalletAddress }),
};

export default api;
