export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string; // e.g., "10:45" or "17 Apr"
  unreadCount?: number; // Optional unread count
  avatarUrl?: string; // Optional avatar image URL
}
