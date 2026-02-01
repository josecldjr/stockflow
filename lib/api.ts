type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions extends RequestInit {
  method?: RequestMethod;
  params?: Record<string, string | number | boolean>;
  body?: unknown;
}

interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || (typeof window !== 'undefined' ? window.location.origin : '');
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = 'GET', params, body, headers = {}, ...restOptions } = options;

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...restOptions,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    const url = this.buildURL(endpoint, params);

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: response.statusText,
        }));

        const error: ApiError = {
          message: errorData.error || errorData.message || 'An error occurred',
          status: response.status,
          details: errorData,
        };

        throw error;
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return null as T;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw {
          message: 'Network error. Please check your connection.',
          status: 0,
        } as ApiError;
      }

      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create a singleton instance
export const api = new ApiClient();

// Export types
export type { ApiError, RequestOptions };

// API endpoints
export const apiEndpoints = {
  users: {
    list: '/api/users',
    create: '/api/users',
    get: (id: string) => `/api/users/${id}`,
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
  },
  organizations: {
    list: '/api/organizations',
    create: '/api/organizations',
    get: (id: string) => `/api/organizations/${id}`,
    update: (id: string) => `/api/organizations/${id}`,
    delete: (id: string) => `/api/organizations/${id}`,
  },
} as const;

