import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a17bcab7`;

async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export const api = {
  places: {
    getAll: () => request('/places'),
    create: (data: any) => request('/places', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string | number, data: any) => request(`/places/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string | number) => request(`/places/${id}`, { method: 'DELETE' }),
  },
  requests: {
    getAll: () => request('/requests'),
    create: (data: any) => request('/requests', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string | number, data: any) => request(`/requests/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string | number) => request(`/requests/${id}`, { method: 'DELETE' }),
  }
};
