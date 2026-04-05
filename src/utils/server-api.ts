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

function buildQuery(params: Record<string, any>): string {
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => [k, String(v)]);
  const query = new URLSearchParams(entries as any).toString();
  return query ? `?${query}` : '';
}

function toUiRequestStatus(status?: string): string {
  if (!status) return 'Pending';
  switch (status) {
    case 'in_progress': return 'In Progress';
    case 'active': return 'In Progress';
    case 'confirmed': return 'In Progress';
    case 'pending_payment': return 'In Progress';
    case 'resolved': return 'Resolved';
    case 'completed': return 'Resolved';
    case 'cancelled': return 'Cancelled';
    case 'pending': return 'Pending';
    default: return status.charAt(0).toUpperCase() + status.slice(1);
  }
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
    report.accessible_toilet ? 'Toilet' : null,
  ].filter(Boolean) as string[];

  return {
    id: location.id,
    name: location.name,
    category: location.category?.name || `Category #${location.category_id ?? '-'}`,
    category_id: location.category_id,
    city: location.government?.name || location.government?.accessible_locations || `Government #${location.government_id ?? '-'}`,
    government_id: location.government_id,
    government_name: location.government?.accessible_locations || location.government?.name || '',
    address: location.address,
    status: report.verified ? 'Verified' : Object.keys(report).length > 0 ? 'Reported' : 'Unverified',
    tags,
    verified: Boolean(report.verified),
    average_rating: Number(location.average_rating || 0),
    reviews_count: Number(location.reviews_count || 0),
    latitude: location.latitude,
    longitude: location.longitude,
    accessibility_report: report,
    updatedAt: location.updated_at,
    createdAt: location.created_at,
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
    getSummary: async (params?: { refresh?: boolean }) => {
      const query = buildQuery({ refresh: params?.refresh ? true : undefined });
      const data = await request(`/admin/dashboard${query}`);
      return asObject(data?.counts);
    },
    getFull: async (params?: { refresh?: boolean }) => {
      const query = buildQuery({ refresh: params?.refresh ? true : undefined });
      const data = await request(`/admin/dashboard${query}`);
      return asObject(data);
    },
  },

  accounts: {
    getAll: async () => {
      const data = await request('/admin/accounts');
      return asObject(data);
    },
    getVolunteerAnalytics: async (id: string | number, params?: { per_page?: number; rating?: number }) => {
      const query = buildQuery(params || {});
      const data = await request(`/admin/accounts/${id}/volunteer-analytics${query}`);
      return asObject(data);
    },
    create: (payload: {
      name: string;
      full_name?: string;
      email: string;
      phone?: string;
      password: string;
      role: 'user' | 'volunteer';
      is_active?: boolean;
    }) => request('/admin/accounts', { method: 'POST', body: JSON.stringify(payload) }),
    update: (id: string | number, payload: {
      name?: string;
      full_name?: string;
      email?: string;
      phone?: string;
      password?: string;
      role?: 'user' | 'volunteer';
      is_active?: boolean;
    }) => request(`/admin/accounts/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    delete: (id: string | number) => request(`/admin/accounts/${id}`, { method: 'DELETE' }),
    approveVolunteer: (id: string | number) => request(`/admin/accounts/${id}/volunteer/approve`, { method: 'POST' }),
    rejectVolunteer: (id: string | number) => request(`/admin/accounts/${id}/volunteer/reject`, { method: 'POST' }),
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
    getAll: async (params?: { search?: string; government_id?: string | number; category_id?: string | number; verified?: boolean | string; per_page?: number }) => {
      const perPage = Math.min(Number(params?.per_page ?? 200) || 200, 200);
      const search = params?.search ?? '';
      const governmentId = params?.government_id ?? '';
      const categoryId = params?.category_id ?? '';
      const verified = typeof params?.verified === 'undefined' ? '' : params?.verified;

      const all: AnyRecord[] = [];
      let page = 1;
      let lastPage = 1;

      while (page <= lastPage) {
        const query = buildQuery({
          search,
          government_id: governmentId,
          category_id: categoryId,
          verified,
          page,
          per_page: perPage,
        });
        const data = await request(`/admin/locations${query}`);

        const pageItems = asArray(data);
        all.push(...pageItems);

        const meta = asObject(data);
        lastPage = Number(meta.last_page ?? meta.lastPage ?? 1) || 1;
        page += 1;
      }

      return all.map(mapLocationToUi);
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
    getIndex: async (params?: { status?: string; search?: string; per_page?: number }) => {
      const query = buildQuery({ status: params?.status || '', search: params?.search || '', per_page: params?.per_page || 100 });
      const data = await request(`/admin/place-submissions${query}`);
      return {
        items: asArray(data),
        summary: asObject(data?.summary),
        meta: asObject(data),
      };
    },
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
    getAll: async (params?: { status?: string; assistance_type?: string; payment_method?: string; payment_completed?: boolean | string; urgency_level?: string; from?: string; to?: string }) => {
      const query = buildQuery({ status: 'all', ...params });
      const data = await request(`/admin/help-requests${query}`);
      return asArray(data).map((item: AnyRecord) => ({
        id: item.id,
        requester: item.requester?.full_name || item.requester?.name || item.name || item.phone || `User #${item.requester_id ?? '-'}`,
        requester_email: item.requester?.email || '',
        requester_phone: item.requester?.phone || '',
        volunteer: item.volunteer?.full_name || item.volunteer?.name || null,
        volunteer_email: item.volunteer?.email || '',
        location: item.location_text || item.from_name || item.to_name || 'Unknown location',
        from_name: item.from_name || '',
        to_name: item.to_name || '',
        notes: item.details || item.message || 'No details',
        status: toUiRequestStatus(item.status),
        raw_status: item.status,
        assistance_type: item.assistance_type || '',
        urgency_level: item.urgency_level || '',
        payment_method: item.payment_method || '',
        payment_completed: Boolean(item.payment_completed),
        payment_status: item.payment_details?.status || item.payment_status || '',
        payment_success: item.payment_details?.success ?? null,
        payment_paid_at: item.payment_details?.paid_at || '',
        payment_amount_egp: item.payment_details?.amount_egp ?? null,
        service_fee: item.service_fee ? (Number(item.service_fee) / 100) : 0,
        fee_amount: item.fee_amount_cents ? (Number(item.fee_amount_cents) / 100) : 0,
        net_amount: item.net_amount_cents ? (Number(item.net_amount_cents) / 100) : 0,
        rating: item.volunteer_review?.rating || null,
        review_comment: item.volunteer_review?.comment || '',
        time: item.created_at || '',
        accepted_at: item.accepted_at || '',
        completed_at: item.completed_at || '',
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
    getIndex: async (params?: { search?: string; category?: string; published?: boolean | string; per_page?: number }) => {
      const query = buildQuery({ search: params?.search || '', category: params?.category || '', published: params?.published, per_page: params?.per_page || 100 });
      const data = await request(`/admin/tutorials${query}`);
      return {
        items: asArray(data),
        summary: asObject(data?.summary),
        categories: asArray<string>(data?.categories),
        meta: asObject(data),
      };
    },
    getAll: async () => {
      const data = await request('/admin/tutorials?search=');
      return asArray(data);
    },
    create: (payload: AnyRecord) => request('/admin/tutorials', { method: 'POST', body: JSON.stringify(payload) }),
    update: (id: string | number, payload: AnyRecord) => request(`/admin/tutorials/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    delete: (id: string | number) => request(`/admin/tutorials/${id}`, { method: 'DELETE' }),
  },

  publicTutorials: {
    getAll: async (params?: { search?: string; category?: string; per_page?: number }) => {
      const query = buildQuery({
        search: params?.search || '',
        category: params?.category || '',
        per_page: params?.per_page || 100,
      });
      const data = await request(`/api/tutorials${query}`);
      return asArray(data);
    },
    trackView: (id: string | number) => request(`/api/tutorials/${id}/view`, { method: 'POST' }),
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
    getIndex: async (params?: { status?: string; search?: string; per_page?: number }) => {
      const query = buildQuery({ status: params?.status || '', search: params?.search || '', per_page: params?.per_page || 100 });
      const data = await request(`/admin/flags${query}`);
      return {
        items: asArray(data),
        summary: asObject(data?.summary),
        meta: asObject(data),
      };
    },
    getAll: async () => {
      const data = await request('/admin/flags?status=');
      return asArray(data);
    },
    requestInfo: (id: string | number, note?: string) => request(`/admin/flags/${id}/request-info`, { method: 'POST', body: JSON.stringify({ note: note || '' }) }),
    dismiss: (id: string | number, note?: string) => request(`/admin/flags/${id}/dismiss`, { method: 'POST', body: JSON.stringify({ note: note || '' }) }),
    resolve: (id: string | number) => request(`/admin/flags/${id}/resolve`, { method: 'POST' }),
  },
};
