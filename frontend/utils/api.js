// API utility functions for the frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth token
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Helper method to make API requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    const authToken = this.getAuthToken();
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
      headers,
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: credentials.email,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data.access_token);
    }
    return data;
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Resume methods
  async uploadResume(file) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/resume/upload`;
    const authToken = this.getAuthToken();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getResumeHistory() {
    return this.request('/resume/history');
  }

  // Analysis methods
  async analyzeResume(resumeId) {
    return this.request(`/analysis/${resumeId}/analyze`, {
      method: 'POST',
    });
  }

  async getAnalysis(resumeId) {
    return this.request(`/analysis/${resumeId}/analysis`);
  }

  // Job matching methods
  async getJobRoles() {
    return this.request('/jobs/roles');
  }

  async getJobMatches(resumeId) {
    return this.request(`/jobs/${resumeId}/matches`);
  }

  async seedJobRoles() {
    return this.request('/jobs/seed-roles', {
      method: 'POST',
    });
  }
}

export default new ApiClient();