'use client';

import { create } from 'zustand';

export interface PinnedMessageItem {
  id: string;
  text: string;
  senderName: string;
  createdAt: string;
}

interface ChatUIState {
  isNewChatOpen: boolean;
  isNewGroupOpen: boolean;
  isGlobalSearchOpen: boolean;
  isGroupInfoOpen: boolean;
  isProfileOpen: boolean;
  activeConversationId: string | null;
  isSocketConnected: boolean;
  isReconnecting: boolean;
  isSidebarCollapsed: boolean;
  pinnedMessages: Record<string, PinnedMessageItem[]>;
  messageReactions: Record<string, Record<string, string[]>>; // messageId -> emoji -> array of userIds

  setNewChatOpen: (open: boolean) => void;
  setNewGroupOpen: (open: boolean) => void;
  setGlobalSearchOpen: (open: boolean) => void;
  setGroupInfoOpen: (open: boolean) => void;
  setProfileOpen: (open: boolean) => void;
  setActiveConversationId: (id: string | null) => void;
  setSocketConnected: (connected: boolean) => void;
  setReconnecting: (reconnecting: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  pinMessage: (conversationId: string, message: PinnedMessageItem) => void;
  unpinMessage: (conversationId: string, messageId: string) => void;
  toggleReaction: (messageId: string, emoji: string, userId: string) => void;
}

const getInitialPins = (): Record<string, PinnedMessageItem[]> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('chatflow_pinned_messages');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const getInitialReactions = (): Record<string, Record<string, string[]>> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('chatflow_reactions');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const useChatUIStore = create<ChatUIState>((set) => ({
  isNewChatOpen: false,
  isNewGroupOpen: false,
  isGlobalSearchOpen: false,
  isGroupInfoOpen: false,
  isProfileOpen: false,
  activeConversationId: null,
  isSocketConnected: false,
  isReconnecting: false,
  isSidebarCollapsed: false,
  pinnedMessages: getInitialPins(),
  messageReactions: getInitialReactions(),

  setNewChatOpen: (open) => set({ isNewChatOpen: open }),
  setNewGroupOpen: (open) => set({ isNewGroupOpen: open }),
  setGlobalSearchOpen: (open) => set({ isGlobalSearchOpen: open }),
  setGroupInfoOpen: (open) => set({ isGroupInfoOpen: open }),
  setProfileOpen: (open) => set({ isProfileOpen: open }),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setSocketConnected: (connected) => set({ isSocketConnected: connected }),
  setReconnecting: (reconnecting) => set({ isReconnecting: reconnecting }),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  toggleSidebarCollapsed: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  pinMessage: (conversationId, item) =>
    set((state) => {
      const current = state.pinnedMessages[conversationId] || [];
      // Don't duplicate; limit to max 3
      const filtered = current.filter((p) => p.id !== item.id);
      const updatedList = [item, ...filtered].slice(0, 3);
      const updated = { ...state.pinnedMessages, [conversationId]: updatedList };
      try {
        localStorage.setItem('chatflow_pinned_messages', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return { pinnedMessages: updated };
    }),

  unpinMessage: (conversationId, messageId) =>
    set((state) => {
      const current = state.pinnedMessages[conversationId] || [];
      const updatedList = current.filter((p) => p.id !== messageId);
      const updated = { ...state.pinnedMessages, [conversationId]: updatedList };
      try {
        localStorage.setItem('chatflow_pinned_messages', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return { pinnedMessages: updated };
    }),

  toggleReaction: (messageId, emoji, userId) =>
    set((state) => {
      const currentMsgReactions = state.messageReactions[messageId] || {};
      const currentUsers = currentMsgReactions[emoji] || [];
      let nextUsers: string[];

      if (currentUsers.includes(userId)) {
        nextUsers = currentUsers.filter((u) => u !== userId);
      } else {
        nextUsers = [...currentUsers, userId];
      }

      const nextMsgReactions = { ...currentMsgReactions };
      if (nextUsers.length > 0) {
        nextMsgReactions[emoji] = nextUsers;
      } else {
        delete nextMsgReactions[emoji];
      }

      const updated = { ...state.messageReactions, [messageId]: nextMsgReactions };
      try {
        localStorage.setItem('chatflow_reactions', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return { messageReactions: updated };
    }),
}));
