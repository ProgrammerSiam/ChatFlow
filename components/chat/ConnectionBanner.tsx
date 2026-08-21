'use client';

import { useChatUIStore } from '@/store/useChatUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function ConnectionBanner() {
  const { isSocketConnected, isReconnecting } = useChatUIStore();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated || isSocketConnected) {
    return null;
  }

  return (
    <div className="bg-amber-500/90 text-white text-xs py-1.5 px-4 flex items-center justify-center gap-2 shadow-sm backdrop-blur transition-all">
      {isReconnecting ? (
        <>
          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          <span>Reconnecting to chat server...</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3.5 w-3.5" />
          <span>Disconnected. Waiting for connection...</span>
        </>
      )}
    </div>
  );
}
