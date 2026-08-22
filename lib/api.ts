import {
  AuthResponse,
  Conversation,
  Message,
  MessagesResponse,
  SearchUser,
  User,
} from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://frontend-task-chatapp.onrender.com/api';

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler | null) => {
  unauthorizedHandler = handler;
};

let authTokenGetter: (() => string | null) | null = null;
export const setAuthTokenGetter = (getter: (() => string | null) | null) => {
  authTokenGetter = getter;
};

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = authTokenGetter ? authTokenGetter() : null;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (unauthorizedHandler) {
      unauthorizedHandler();
    }
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || 'Session expired. Please log in again.';
    throw new Error(message);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.error?.message ||
      errorData?.message ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    // Attach error code if available
    (error as Error & { code?: string }).code = errorData?.error?.code;
    throw error;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  // Auth
  async login(phone: string, name: string): Promise<AuthResponse> {
    const res = await apiRequest<
      { token?: string; user?: User; data?: User } & User
    >('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, name }),
    });

    const token = res.token || '';
    const user: User =
      res.user ||
      res.data ||
      (res._id ? { _id: res._id, name: res.name, phone: res.phone, createdAt: res.createdAt } : ({} as User));

    return { token, user };
  },

  async getMe(): Promise<{ user: User }> {
    const res = await apiRequest<
      { user?: User; data?: User } & User
    >('/auth/me', {
      method: 'GET',
    });

    const user: User =
      res.user ||
      res.data ||
      (res._id ? { _id: res._id, name: res.name, phone: res.phone, createdAt: res.createdAt } : ({} as User));

    return { user };
  },

  // Users
  async searchUsers(query: string): Promise<SearchUser[]> {
    const encoded = encodeURIComponent(query.trim());
    return apiRequest<SearchUser[]>(`/users/search?q=${encoded}`, {
      method: 'GET',
    });
  },

  // Conversations
  async getConversations(): Promise<{ data: Conversation[] }> {
    return apiRequest<{ data: Conversation[] }>('/conversations', {
      method: 'GET',
    });
  },

  async createDirectConversation(userId: string): Promise<Conversation> {
    return apiRequest<Conversation>('/conversations', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },

  async createGroupConversation(
    name: string,
    participantIds: string[]
  ): Promise<Conversation> {
    return apiRequest<Conversation>('/conversations/group', {
      method: 'POST',
      body: JSON.stringify({ name, participantIds }),
    });
  },

  // Messages
  async getMessages(
    conversationId: string,
    limit: number = 20,
    before?: string
  ): Promise<MessagesResponse> {
    let url = `/conversations/${conversationId}/messages?limit=${limit}`;
    if (before) {
      url += `&before=${encodeURIComponent(before)}`;
    }
    return apiRequest<MessagesResponse>(url, {
      method: 'GET',
    });
  },

  async sendMessage(
    conversationId: string,
    text: string
  ): Promise<Message> {
    return apiRequest<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify({ conversationId, text }),
    });
  },

  // Group Management
  async renameGroup(conversationId: string, name: string): Promise<Conversation> {
    return apiRequest<Conversation>(`/conversations/${conversationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });
  },

  async addGroupParticipants(
    conversationId: string,
    userIds: string[]
  ): Promise<Conversation> {
    return apiRequest<Conversation>(
      `/conversations/${conversationId}/participants`,
      {
        method: 'POST',
        body: JSON.stringify({ userIds }),
      }
    );
  },

  async removeGroupParticipant(
    conversationId: string,
    userId: string
  ): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(
      `/conversations/${conversationId}/participants/${userId}`,
      {
        method: 'DELETE',
      }
    );
  },

  async promoteGroupAdmin(
    conversationId: string,
    userId: string
  ): Promise<Conversation> {
    return apiRequest<Conversation>(
      `/conversations/${conversationId}/admins`,
      {
        method: 'POST',
        body: JSON.stringify({ userId }),
      }
    );
  },

  async getHealth(): Promise<{ status: string }> {
    return apiRequest<{ status: string }>('/health', {
      method: 'GET',
    });
  },
};
