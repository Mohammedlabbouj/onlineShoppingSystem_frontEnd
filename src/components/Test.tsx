import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "./Avater";
import ConversationListItem from "./ConversationListItem";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Message } from "@/types/Message";
import { Conversation } from "@/types/Conversation";

interface ChatAppProps {}

// --- Mock Data ---
const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Vendor A",
    lastMessage: "Hello! How can I help you?",
    timestamp: "10:45",
    unreadCount: 1,
    avatarUrl: "https://placehold.co/100x100/E0E0E0/BDBDBD?text=VA", // Placeholder
  },
  {
    id: 2,
    name: "Vendor B",
    lastMessage: "ok",
    timestamp: "08:30",
    avatarUrl: "https://placehold.co/100x100/D1C4E9/B39DDB?text=VB", // Placeholder
  },
  {
    id: 3,
    name: "Vendor C",
    lastMessage: "Yes, It will be restocked...",
    timestamp: "17 Apr",
    avatarUrl: "https://placehold.co/100x100/C8E6C9/A5D6A7?text=VC", // Placeholder
  },
  {
    id: 4,
    name: "Vendor D",
    lastMessage: "Product has been shipped",
    timestamp: "16 Apr",
    avatarUrl: "https://placehold.co/100x100/BBDEFB/90CAF9?text=VD", // Placeholder
  },
];

const mockMessages: { [key: number]: Message[] } = {
  1: [
    {
      id: 101,
      sender: "them",
      text: "Hello! How can I help you?",
      timestamp: "10:45",
    },
    {
      id: 102,
      sender: "me",
      text: "I'd like to know the status of my order",
      timestamp: "10:45",
    },
    {
      id: 103,
      sender: "them",
      text: "Your order has been confirmed.",
      timestamp: "10:50",
    },
    {
      id: 104,
      sender: "me",
      text: "When can I expect it to be delivered?",
      timestamp: "10:52",
    },
    {
      id: 105,
      sender: "them",
      text: "It should be delivered by tomorrow.",
      timestamp: "10:55",
    },
    {
      id: 106,
      sender: "me",
      text: "Thank you for the information!",
      timestamp: "10:59",
    },
  ],
  2: [{ id: 201, sender: "them", text: "ok", timestamp: "08:30" }],
  3: [
    {
      id: 301,
      sender: "them",
      text: "Yes, It will be restocked soon.",
      timestamp: "17 Apr",
    },
  ],
  4: [
    {
      id: 401,
      sender: "them",
      text: "Product has been shipped",
      timestamp: "16 Apr",
    },
    { id: 402, sender: "me", text: "Great, thanks!", timestamp: "16 Apr" },
  ],
};

// --- Main Chat Application Component ---
const App: React.FC<ChatAppProps> = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(conversations[0]?.id ?? null); // Select first convo initially
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>(
    mockMessages,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling

  // Scroll to bottom when messages change or conversation is selected
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConversationId]);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );
  const currentMessages = selectedConversationId
    ? messages[selectedConversationId] || []
    : [];

  const handleSelectConversation = (id: number) => {
    setSelectedConversationId(id);
    // Optionally mark messages as read here
    const updatedConversations = conversations.map((convo) =>
      convo.id === id ? { ...convo, unreadCount: 0 } : convo,
    );
    setConversations(updatedConversations);
  };

  const handleSendMessage = (text: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: Date.now(), // Simple unique ID for demo
      sender: "me",
      text: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }), // Current time
    };

    // Update messages for the current conversation
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedConversationId]: [
        ...(prevMessages[selectedConversationId] || []),
        newMessage,
      ],
    }));

    // Update the last message in the conversation list
    setConversations((prevConvos) =>
      prevConvos.map((convo) =>
        convo.id === selectedConversationId
          ? { ...convo, lastMessage: text, timestamp: newMessage.timestamp }
          : convo,
      ),
    );

    // TODO: Simulate receiving a reply after a short delay for demo
    // setTimeout(() => receiveMockReply(selectedConversationId), 1500);
  };

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header/Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent text-sm"
            />
            {/* Search Icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-grow overflow-y-auto p-2">
          <h2 className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2 mt-2">
            Conversations
          </h2>
          <ul>
            {filteredConversations.length > 0 ? (
              filteredConversations.map((convo) => (
                <ConversationListItem
                  key={convo.id}
                  conversation={convo}
                  isSelected={convo.id === selectedConversationId}
                  onClick={() => handleSelectConversation(convo.id)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm mt-4 px-3">
                No conversations found.
              </p>
            )}
          </ul>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar
                  src={selectedConversation.avatarUrl}
                  alt={selectedConversation.name}
                  size="md"
                  className="mr-3"
                />
                <h2 className="font-semibold text-gray-800">
                  {selectedConversation.name}
                </h2>
              </div>
              {/* Options Button */}
              <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                {/* More Options Icon (Inline SVG or from library) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </header>

            {/* Message List */}
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
              {currentMessages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {/* Dummy div to target for scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </main>
    </div>
  );
};

export default App; // Export the main component
//```css
///* Optional: Add this to your global CSS if you haven't already for better scrollbars */
///* Customize scrollbar */
//::-webkit-scrollbar {
//  width: 6px; /* Width of the scrollbar */
//  height: 6px; /* Height for horizontal scrollbar */
//}
//
///* Track */
//::-webkit-scrollbar-track {
//  background: #f1f1f1; /* Color of the tracking area */
//  border-radius: 10px;
//}
//
///* Handle */
//::-webkit-scrollbar-thumb {
//  background: #c1c1c1; /* Color of the scrollbar handle */
//  border-radius: 10px;
//}
//
///* Handle on hover */
//::-webkit-scrollbar-thumb:hover {
//  background: #a1a1a1; /* Darker color on hover */
//}
//

