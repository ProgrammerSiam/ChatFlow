'use client';

import { create } from 'zustand';
import { User } from '@/types';
import { api, setAuthTokenGetter, setUnauthorizedHandler } from '@/lib/api';
import { disconnectSocket } from '@/lib/socket';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (phone: string, name: string) => Promise<User>;
  logout: () => void;
  initializeAuth: () => Promise<boolean>;
  setSession: (token: string, user: User) => void;
}

const TOKEN_KEY = 'chatflow_token';
const USER_KEY = 'chatflow_user';

export const useAuthStore = create<AuthState>((set, get) => {
  // Wire up token getter and unauthorized handler for API client
  setAuthTokenGetter(() => get().token);
  setUnauthorizedHandler(() => {
    get().logout();
  });

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    setSession: (token: string, user: User) => {
      if (!user || !user._id) {
        // If user object is missing, still update token if provided, but don't overwrite valid user with undefined
        if (token && typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, token);
        }
        set((state) => ({
          token: token || state.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }));
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    },

    login: async (phone: string, name: string) => {
      set({ isLoading: true, error: null });
      try {
        const data = await api.login(phone, name);
        get().setSession(data.token, data.user);
        return data.user;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Login failed';
        set({ isLoading: false, error: msg });
        throw err;
      }
    },

    logout: () => {
      disconnectSocket();
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    },

    initializeAuth: async () => {
      if (typeof window === 'undefined') {
        set({ isLoading: false });
        return false;
      }

      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUserStr = localStorage.getItem(USER_KEY);

      if (!storedToken) {
        set({ isLoading: false, isAuthenticated: false, user: null, token: null });
        return false;
      }

      try {
        let initialUser: User | null = null;
        if (storedUserStr && storedUserStr !== 'undefined' && storedUserStr !== 'null') {
          try {
            initialUser = JSON.parse(storedUserStr);
          } catch {
            // ignore parse error
          }
        }

        // Hydrate from localStorage immediately so currentUser is available on initial render
        set({ token: storedToken, user: initialUser, isAuthenticated: true, isLoading: false });

        // Validate token and fetch fresh user profile from server
        const res = await api.getMe();
        const serverUser = res?.user || (res as unknown as User);
        if (serverUser && serverUser._id) {
          get().setSession(storedToken, serverUser);
        }
        return true;
      } catch {
        get().logout();
        return false;
      }
    },
  };
});
