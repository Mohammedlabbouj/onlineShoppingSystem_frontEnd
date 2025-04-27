export interface Message {
  id: number;
  sender: "me" | "them"; // 'me' for the user, 'them' for the contact
  text: string;
  timestamp: string; // e.g., "10:45"
}
