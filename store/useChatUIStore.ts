'use client';

import { create } from 'zustand';

interface ChatUIState {
  isNewChatOpen: boolean;
  isNewGroupOpen: boolean;
  isGroupInfoOpen: boolean;
  isProfileOpen: boolean;
  activeConversationId: string | null;
  isSocketConnected: boolean;
  isReconnecting: boolean;

  setNewChatOpen: (open: boolean) => void;
  setNewGroupOpen: (open: boolean) => void;
  setGroupInfoOpen: (open: boolean) => void;
  setProfileOpen: (open: boolean) => void;
  setActiveConversationId: (id: string | null) => void;
  setSocketConnected: (connected: boolean) => void;
  setReconnecting: (reconnecting: boolean) => void;
}

export const useChatUIStore = create<ChatUIState>((set) => ({
  isNewChatOpen: false,
  isNewGroupOpen: false,
  isGroupInfoOpen: false,
  isProfileOpen: false,
  activeConversationId: null,
  isSocketConnected: false,
  isReconnecting: false,
  isSidebarCollapsed: false,

  setNewChatOpen: (open) => set({ isNewChatOpen: open }),
  setNewGroupOpen: (open) => set({ isNewGroupOpen: open }),
  setGroupInfoOpen: (open) => set({ isGroupInfoOpen: open }),
  setProfileOpen: (open) => set({ isProfileOpen: open }),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setSocketConnected: (connected) => set({ isSocketConnected: connected }),
  setReconnecting: (reconnecting) => set({ isReconnecting: reconnecting }),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  toggleSidebarCollapsed: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));
