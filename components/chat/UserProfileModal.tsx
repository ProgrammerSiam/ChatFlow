'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  User as UserIcon,
  Phone,
  Key,
  Calendar,
  ShieldCheck,
  LogOut,
  Copy,
  Check,
  Activity,
  Loader2,
  Home,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatUIStore } from '@/store/useChatUIStore';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { User } from '@/types';

export default function UserProfileModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: storeUser, logout, setSession } = useAuthStore();
  const { isProfileOpen, setProfileOpen, isSocketConnected } = useChatUIStore();
  const [copied, setCopied] = useState(false);

  // Fetch /auth/me to always get fresh user session info when modal is open
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await api.getMe();
        const userData: User | null =
          (res as { user?: User })?.user || (res as unknown as User) || null;
        if (userData && typeof window !== 'undefined') {
          const token = localStorage.getItem('chatflow_token') || '';
          setSession(token, userData);
        }
        return userData || null;
      } catch {
        return storeUser || null;
      }
    },
    enabled: isProfileOpen,
    staleTime: 10 * 1000,
  });

  // Health check query
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      try {
        const res = await api.getHealth();
        return res || { status: 'ok' };
      } catch {
        return { status: 'unknown' };
      }
    },
    enabled: isProfileOpen,
    staleTime: 30 * 1000,
  });

  // Close on Escape key
  useEffect(() => {
    if (!isProfileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProfileOpen, setProfileOpen]);

  if (!isProfileOpen) return null;

  // Resolve user from meQuery -> storeUser -> localStorage
  let currentUser: User | null = meQuery.data || storeUser;
  if (!currentUser && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('chatflow_user');
      if (stored) currentUser = JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  const handleCopyId = () => {
    if (currentUser?._id) {
      navigator.clipboard.writeText(currentUser._id);
      setCopied(true);
      toast.success('User ID copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    queryClient.clear();
    setProfileOpen(false);
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recently';
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[32px] border border-border/80 bg-white/95 dark:bg-card/95 p-7 shadow-2xl backdrop-blur-2xl text-card-foreground">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2.5 font-bold text-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <span>Account Profile (GET /auth/me)</span>
          </div>
          <button
            onClick={() => setProfileOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Card Body */}
        {meQuery.isLoading && !currentUser ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-xs text-muted-foreground">Fetching profile from /auth/me...</p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {/* Avatar and Name */}
            <div className="flex flex-col items-center text-center space-y-2 py-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/40">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-purple-600 text-white font-extrabold text-2xl shadow-md">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                <span
                  className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${
                    isSocketConnected ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  title={isSocketConnected ? 'Socket Connected' : 'Connecting'}
                />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  {currentUser?.name || 'User Profile'}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">{currentUser?.phone || ''}</p>
              </div>
            </div>

            {/* Detailed Info List */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border/80 shadow-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Key className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold">User ID</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-foreground font-semibold max-w-[140px] truncate">
                    {currentUser?._id || 'N/A'}
                  </span>
                  {currentUser?._id && (
                    <button
                      onClick={handleCopyId}
                      className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Copy User ID"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border/80 shadow-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold">Phone Number</span>
                </div>
                <span className="font-semibold text-foreground font-mono">
                  {currentUser?.phone || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border/80 shadow-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold">Registered Since</span>
                </div>
                <span className="text-foreground font-semibold">
                  {formatDate(currentUser?.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border/80 shadow-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span className="font-semibold">Session Status</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  ● Bearer JWT Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border/80 shadow-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold">API Health (GET /health)</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  ● {healthQuery.data?.status === 'ok' ? 'System Operational' : 'Checking...'}
                </span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push('/');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-border bg-white dark:bg-muted py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer shadow-xs"
              >
                <Home className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Visit ChatFlow Homepage</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 py-2.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out of Session</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
