import { io, Socket } from 'socket.io-client';
import { useChatUIStore } from '@/store/useChatUIStore';
import { QueryClient } from '@tanstack/react-query';

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'https://frontend-task-chatapp.onrender.com';

let socketInstance: Socket | null = null;
let queryClientRef: QueryClient | null = null;
let hasConnectedOnce = false;

export const setSocketQueryClient = (client: QueryClient) => {
  queryClientRef = client;
};

export const getSocket = (): Socket | null => {
  return socketInstance;
};

export const initializeSocket = (token: string): Socket => {
  if (socketInstance) {
    if (socketInstance.connected) {
      return socketInstance;
    }
    socketInstance.disconnect();
  }

  socketInstance = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socketInstance.on('connect', () => {
    useChatUIStore.getState().setSocketConnected(true);
    useChatUIStore.getState().setReconnecting(false);

    if (hasConnectedOnce && queryClientRef) {
      // Gap-fill on reconnection
      queryClientRef.invalidateQueries({ queryKey: ['conversations'] });
      const activeId = useChatUIStore.getState().activeConversationId;
      if (activeId) {
        queryClientRef.invalidateQueries({ queryKey: ['messages', activeId] });
      }
    }
    hasConnectedOnce = true;
  });

  socketInstance.on('disconnect', (reason) => {
    useChatUIStore.getState().setSocketConnected(false);
    if (reason === 'io server disconnect') {
      // the disconnection was initiated by the server, reconnect manually if authenticated
      socketInstance?.connect();
    } else {
      useChatUIStore.getState().setReconnecting(true);
    }
  });

  socketInstance.on('connect_error', () => {
    useChatUIStore.getState().setSocketConnected(false);
    useChatUIStore.getState().setReconnecting(true);
  });

  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.removeAllListeners();
    socketInstance.disconnect();
    socketInstance = null;
  }
  hasConnectedOnce = false;
  useChatUIStore.getState().setSocketConnected(false);
  useChatUIStore.getState().setReconnecting(false);
};
