const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:8000';

type AnyRecord = Record<string, any>;

async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const message = json?.message || json?.error || 'Request failed';
    throw new Error(message);
  }

  return json;
}

function asArray<T = AnyRecord>(value: any): T[] {
  if (Array.isArray(value)) return value as T[];
  if (Array.isArray(value?.data)) return value.data as T[];
  return [];
}

function asObject<T = AnyRecord>(value: any): T {
  if (value && typeof value === 'object') return value as T;
  return {} as T;
}

function toUiRequestStatus(status?: string): string {
  if (status === 'in_progress') return 'In Progress';
  if (status === 'resolved') return 'Resolved';
  return 'Pending';
}

function toApiRequestStatus(status?: string): string {
  if (!status) return 'pending';
  const normalized = status.toLowerCase();
  if (normalized.includes('progress')) return 'in_progress';
  if (normalized.includes('resolved')) return 'resolved';
  return 'pending';
}

function mapLocationToUi(location: AnyRecord): AnyRecord {
  const report = location.accessibility_report || location.accessibilityReport || {};
  const tags = [
    report.wheelchair_accessible ? 'Wheelchair' : null,
    report.ramp_available ? 'Ramp' : null,
    report.elevator_available ? 'Elevator' : null,
    report.parking ? 'Parking' : null,
  ].filter(Boolean) as string[];

  return {
    id: location.id,
    name: location.name,
    category: location.category?.name || `Category #${location.category_id ?? '-'}`,
    city: location.government?.name || location.government?.accessible_locations || `Government #${location.government_id ?? '-'}`,
    address: location.address,
    status: 'Approved',
    tags,
    updatedAt: location.updated_at,
    raw: location,
  };
}

async function getDefaultIds() {
  const [governmentsRaw, categoriesRaw] = await Promise.all([
    request('/admin/governments'),
    request('/admin/categories'),
  ]);

  const governments = asArray(governmentsRaw);
  const categories = asArray(categoriesRaw);

  if (!governments[0]?.id) {
    throw new Error('No governments found. Create one first from admin/governments.');
  }

  return {
    governmentId: governments[0].id as number,
    categoryId: categories[0]?.id as number | undefined,
  };
}

export const api = {
  auth: {
    login: (email: string, password: string) => request('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    me: () => request('/admin/me'),
    logout: () => request('/admin/logout', { method: 'POST' }),
  },

  dashboard: {
    getSummary: async () => {
      const data = await request('/admin/dashboard');
      return asObject(data?.counts);
    },
  },

  governments: {
    getAll: async () => {
      const data = await request('/admin/governments');
      return asArray(data);
    },
    create: (accessible_locations: string) => request('/admin/governments', {
      method: 'POST',
      body: JSON.stringify({ accessible_locations }),
    }),
  },

  categories: {
    getAll: async () => {
      const data = await request('/admin/categories');
      return asArray(data);
    },
    create: (payload: { name: string; icon?: string }) => request('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
    update: (id: string | number, payload: { name?: string; icon?: string | null }) => request(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
    delete: (id: string | number) => request(`/admin/categories/${id}`, { method: 'DELETE' }),
  },

  places: {
    getAll: async () => {
      const data = await request('/admin/locations?search=&government_id=&category_id=');
      return asArray(data).map(mapLocationToUi);
    },
    create: async (data: AnyRecord) => {
      const defaults = await getDefaultIds();
      const payload = {
        name: data.name,
        address: data.address || data.city || 'N/A',
        government_id: Number(data.government_id) || defaults.governmentId,
        latitude: Number(data.latitude) || 30.0444,
        longitude: Number(data.longitude) || 31.2357,
        category_id: Number(data.category_id) || defaults.categoryId || null,
      };
      const created = await request('/admin/locations', { method: 'POST', body: JSON.stringify(payload) });
      return mapLocationToUi(created);
    },
    update: async (id: string | number, data: AnyRecord) => {
      const payload: AnyRecord = {};
      if (typeof data.name === 'string') payload.name = data.name;
      if (typeof data.address === 'string') payload.address = data.address;
      if (typeof data.government_id !== 'undefined') payload.government_id = data.government_id;
      if (typeof data.category_id !== 'undefined') payload.category_id = data.category_id;
      if (typeof data.latitude !== 'undefined') payload.latitude = data.latitude;
      if (typeof data.longitude !== 'undefined') payload.longitude = data.longitude;

      const updated = await request(`/admin/locations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      const ui = mapLocationToUi(updated);
      if (typeof data.status === 'string') {
        ui.status = data.status;
      }
      return ui;
    },
    delete: (id: string | number) => request(`/admin/locations/${id}`, { method: 'DELETE' }),
    upsertAccessibilityReport: (id: string | number, payload: AnyRecord) => request(`/admin/locations/${id}/accessibility-report`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  },

  placeSubmissions: {
    getAll: async (status = '') => {
      const query = status ? `?status=${encodeURIComponent(status)}` : '?status=';
      const data = await request(`/admin/place-submissions${query}`);
      return asArray(data);
    },
    approve: (id: string | number, payload: { create_location?: boolean; government_id?: number }) => request(`/admin/place-submissions/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
    reject: (id: string | number, rejection_reason: string) => request(`/admin/place-submissions/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ rejection_reason }),
    }),
  },

  requests: {
    getAll: async () => {
      const data = await request('/admin/help-requests?status=all');
      return asArray(data).map((item: AnyRecord) => ({
        id: item.id,
        requester: item.name || item.requester?.name || item.phone || `User #${item.requester_id ?? '-'}`,
        location: item.location_text || item.from_name || item.to_name || 'Unknown location',
        notes: item.details || item.message || 'No details',
        status: toUiRequestStatus(item.status),
        time: item.created_at || '',
        raw: item,
      }));
    },
    create: (data: AnyRecord) => request('/api/help-requests', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id: string | number, data: AnyRecord) => {
      const status = toApiRequestStatus(data.status);
      if (status === 'resolved') {
        await request(`/admin/help-requests/${id}/resolve`, { method: 'POST' });
      } else {
        await request(`/admin/help-requests/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ status }),
        });
      }

      const updated = await request(`/admin/help-requests/${id}`);
      return {
        id: updated.id,
        requester: updated.name || updated.requester?.name || updated.phone || `User #${updated.requester_id ?? '-'}`,
        location: updated.location_text || updated.from_name || updated.to_name || 'Unknown location',
        notes: updated.details || updated.message || 'No details',
        status: toUiRequestStatus(updated.status),
        time: updated.created_at || '',
        raw: updated,
      };
    },
    delete: async (id: string | number) => {
      await request(`/admin/help-requests/${id}/resolve`, { method: 'POST' });
      return { success: true };
    },
  },

  tutorials: {
    getAll: async () => {
      const data = await request('/admin/tutorials?search=');
      return asArray(data);
    },
    create: (payload: AnyRecord) => request('/admin/tutorials', { method: 'POST', body: JSON.stringify(payload) }),
    update: (id: string | number, payload: AnyRecord) => request(`/admin/tutorials/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    delete: (id: string | number) => request(`/admin/tutorials/${id}`, { method: 'DELETE' }),
  },

  notifications: {
    getAll: async () => {
      const data = await request('/admin/notifications?status=all');
      return asArray(data);
    },
    markRead: (id: string | number) => request(`/admin/notifications/${id}/read`, { method: 'POST' }),
    markAllRead: () => request('/admin/notifications/read-all', { method: 'POST' }),
  },

  reports: {
    getAll: async () => {
      const data = await request('/admin/flags?status=');
      return asArray(data);
    },
    requestInfo: (id: string | number, note?: string) => request(`/admin/flags/${id}/request-info`, { method: 'POST', body: JSON.stringify({ note: note || '' }) }),
    dismiss: (id: string | number, note?: string) => request(`/admin/flags/${id}/dismiss`, { method: 'POST', body: JSON.stringify({ note: note || '' }) }),
    resolve: (id: string | number) => request(`/admin/flags/${id}/resolve`, { method: 'POST' }),
  },
};
