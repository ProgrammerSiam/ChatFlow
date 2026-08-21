export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
}

export interface DirectParticipant {
  _id: string;
  name: string;
  phone: string;
}

export interface GroupParticipant {
  _id: string;
  name: string;
  phone: string;
}

export interface LastMessage {
  _id?: string;
  text?: string;
  sender?: string | { _id: string; name?: string };
  createdAt?: string;
}

export interface Conversation {
  _id: string;
  type: 'direct' | 'group';
  name?: string;
  participant?: DirectParticipant;
  participants?: GroupParticipant[];
  admins?: string[];
  lastMessage?: LastMessage | null;
  unreadCount?: number;
  updatedAt: string;
  createdAt?: string;
}

export interface MessageSender {
  _id: string;
  name: string;
  phone?: string;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string | MessageSender;
  text: string;
  createdAt: string;
  tempId?: string;
  status?: 'sending' | 'sent' | 'failed';
}

export interface MessagesResponse {
  messages: Message[];
  hasMore: boolean;
}

export interface SearchUser {
  _id: string;
  name: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
  };
}
