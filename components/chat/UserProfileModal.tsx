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
import ConfirmModal from '@/shared/ConfirmModal';
import CoolTooltip from '@/shared/CoolTooltip';

export default function UserProfileModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: storeUser, logout, setSession } = useAuthStore();
  const { isProfileOpen, setProfileOpen, isSocketConnected } = useChatUIStore();
  const [copied, setCopied] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

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
    setIsLogoutConfirmOpen(false);
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
      return 'Recently';
    }
  };

  return (
    <div
      onClick={() => setProfileOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[28px] border border-slate-200/80 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-2xl text-card-foreground"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold shadow-2xs">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Account Profile
              </h2>
            </div>
          </div>
          <button
            onClick={() => setProfileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Card Body */}
        {meQuery.isLoading && !currentUser ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-xs text-muted-foreground">
              Loading account profile...
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {/* Avatar and Name Hero Card */}
            <div className="flex flex-col items-center text-center space-y-2.5 p-6 bg-gradient-to-b from-purple-50/80 via-indigo-50/30 to-white/60 dark:from-purple-950/40 dark:via-purple-900/20 dark:to-muted/20 rounded-[28px] border border-purple-100/80 dark:border-purple-800/30 shadow-xs">
              <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white font-extrabold text-2xl shadow-md">
                {currentUser?.name
                  ? currentUser.name.charAt(0).toUpperCase()
                  : 'U'}
                <span
                  className={`absolute bottom-0.5 right-0.5 h-4.5 w-4.5 rounded-full border-3 border-white dark:border-card ${
                    isSocketConnected ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  title={isSocketConnected ? 'Socket Connected' : 'Connecting'}
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {currentUser?.name || 'User Profile'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5">
                  {currentUser?.phone || ''}
                </p>
              </div>
            </div>

            {/* Detailed Info List with Increased Height & Larger Text */}
            <div className="space-y-2.5">
              {/* User ID */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-muted/30 border border-slate-200/80 dark:border-border/70 ">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Key className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-xs sm:text-sm">
                    User ID
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-900 dark:text-white font-semibold text-xs sm:text-sm max-w-[150px] truncate">
                    {currentUser?._id || 'N/A'}
                  </span>
                  {currentUser?._id && (
                    <CoolTooltip
                      content={copied ? 'Copied to clipboard' : 'Copy User ID'}
                      side="top"
                    >
                      <button
                        onClick={handleCopyId}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-muted text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </CoolTooltip>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-muted/30 border border-slate-200/80 dark:border-border/70 ">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Phone className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-xs sm:text-sm">
                    Phone Number
                  </span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white font-mono text-xs sm:text-sm">
                  {currentUser?.phone || 'N/A'}
                </span>
              </div>

              {/* Registered Since */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-muted/30 border border-slate-200/80 dark:border-border/70 ">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-xs sm:text-sm">
                    Registered Since
                  </span>
                </div>
                <span className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                  {formatDate(currentUser?.createdAt)}
                </span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push('/');
                }}
                className="w-full h-11 sm:h-12 flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 dark:border-border bg-white dark:bg-muted/40 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted transition-colors cursor-pointer shadow-2xs"
              >
                <Home className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
                <span>Visit ChatFlow Homepage</span>
              </button>

              <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="w-full h-11 sm:h-12 flex items-center justify-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer shadow-2xs"
              >
                <LogOut className="h-4.5 w-4.5" />
                <span>Log Out of Session</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        title="Log out of ChatFlow?"
        description="You will be disconnected from the real-time server. You'll need to enter your phone number to log back in."
        confirmText="Log Out"
        variant="danger"
        icon="logout"
      />
    </div>
  );
}
