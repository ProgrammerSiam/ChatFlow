import { io, Socket } from 'socket.io-client';
import { useChatUIStore } from '@/store/useChatUIStore';
import { QueryClient } from '@tanstack/react-query';

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'https://frontend-task-chatapp.onrender.com';

let socketInstance: Socket | null = null;
let queryClientRef: QueryClient | null = null;
let hasConnectedOnce = false;
let internalHandlersAttached = false;

export const setSocketQueryClient = (client: QueryClient) => {
  queryClientRef = client;
};

export const getSocket = (): Socket | null => {
  return socketInstance;
};

/**
 * Attach (or re-attach) the internal lifecycle handlers on the socket instance.
 * Idempotent — checks the `internalHandlersAttached` flag so handlers are never
 * duplicated, but ARE restored after a `disconnectSocket()` that strips them.
 */
function ensureInternalHandlers(socket: Socket): void {
  if (internalHandlersAttached) return;

  socket.on('connect', () => {
    useChatUIStore.getState().setSocketConnected(true);
    useChatUIStore.getState().setReconnecting(false);

    if (hasConnectedOnce && queryClientRef) {
      // Gap-fill on reconnection: refetch conversations + active chat messages
      queryClientRef.invalidateQueries({ queryKey: ['conversations'] });
      const activeId = useChatUIStore.getState().activeConversationId;
      if (activeId) {
        queryClientRef.invalidateQueries({ queryKey: ['messages', activeId] });
      }
    }
    hasConnectedOnce = true;
  });

  socket.on('disconnect', (reason) => {
    useChatUIStore.getState().setSocketConnected(false);
    if (reason === 'io server disconnect') {
      // Server-initiated disconnect — reconnect manually if authenticated
      socket.connect();
    } else {
      useChatUIStore.getState().setReconnecting(true);
    }
  });

  socket.on('connect_error', () => {
    useChatUIStore.getState().setSocketConnected(false);
    useChatUIStore.getState().setReconnecting(true);
  });

  internalHandlersAttached = true;
}

export const initializeSocket = (token: string): Socket => {
  if (socketInstance) {
    // If the token has changed, update auth and force a fresh handshake
    const currentToken = (socketInstance.auth as { token?: string })?.token;
    if (currentToken !== token) {
      socketInstance.auth = { token };
      if (socketInstance.connected) {
        // Force re-handshake with new credentials
        socketInstance.disconnect().connect();
      }
    }

    // Always re-attach internal handlers if they were stripped
    // (e.g. after a previous disconnectSocket() call)
    ensureInternalHandlers(socketInstance);

    if (socketInstance.connected) {
      return socketInstance;
    }

    // Socket exists but is disconnected — reconnect with current auth
    socketInstance.auth = { token };
    socketInstance.connect();
    return socketInstance;
  }

  // First-time creation
  socketInstance = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  ensureInternalHandlers(socketInstance);

  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.removeAllListeners();
    socketInstance.disconnect();
    socketInstance = null;
  }
  hasConnectedOnce = false;
  internalHandlersAttached = false;
  useChatUIStore.getState().setSocketConnected(false);
  useChatUIStore.getState().setReconnecting(false);
};
