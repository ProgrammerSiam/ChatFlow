'use client';

import { useEffect } from 'react';
import { AlertTriangle, LogOut, Trash2, X, Loader2, Crown } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
  icon?: 'logout' | 'trash' | 'warning' | 'crown';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
  icon = 'warning',
}: ConfirmModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  const renderIcon = () => {
    if (icon === 'logout') return <LogOut className="h-5 w-5" />;
    if (icon === 'trash') return <Trash2 className="h-5 w-5" />;
    if (icon === 'crown') return <Crown className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  const getVariantStyles = () => {
    if (variant === 'danger') {
      return {
        iconBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60',
        confirmBtn:
          'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-400',
      };
    }
    if (variant === 'warning') {
      return {
        iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60',
        confirmBtn:
          'bg-amber-600 hover:bg-amber-700 text-white shadow-xs focus:ring-amber-400',
      };
    }
    return {
      iconBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border border-purple-200/60',
      confirmBtn:
        'bg-purple-600 hover:bg-purple-700 text-white shadow-xs focus:ring-purple-400',
    };
  };

  const styles = getVariantStyles();

  return (
    <div
      onClick={() => !isLoading && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[28px] border border-slate-200/80 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-2xl text-card-foreground animate-in zoom-in-95 duration-150"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${styles.iconBg} font-bold shadow-2xs shrink-0`}>
              {renderIcon()}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-muted text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Description Body */}
        <p className="mt-3.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Actions Footer */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="h-11 rounded-xl border border-slate-200/80 dark:border-border bg-white dark:bg-muted/40 hover:bg-slate-50 dark:hover:bg-muted text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`h-11 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 ${styles.confirmBtn}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
