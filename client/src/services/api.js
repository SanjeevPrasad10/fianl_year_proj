import axios from 'axios';

export const sanitizeApiUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  let clean = url.trim().replace(/\/+$/, '');
  if (!clean || clean === 'undefined' || clean === 'null') return null;
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }
  try {
    const parsed = new URL(clean);
    return parsed.href.replace(/\/+$/, '');
  } catch {
    return null;
  }
};

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('cw_api_url');
    const sanitizedCustom = sanitizeApiUrl(custom);
    if (sanitizedCustom) return sanitizedCustom;
  }
  const envUrl = import.meta.env.VITE_API_URL;
  const sanitizedEnv = sanitizeApiUrl(envUrl);
  if (sanitizedEnv) return sanitizedEnv;

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
      // Don't auto-clear on auth routes, agent queries, or demo mode
      const url = error.config?.url || '';
      const isExempt = url.includes('/auth/') || url.includes('/agent/');
      const currentToken = localStorage.getItem('cw_token');
      if (!isExempt && currentToken && currentToken !== 'demo-jwt-token-preview') {
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
