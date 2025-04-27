import { useState } from "react";

// Chat Input Area
interface ChatInputProps {
  onSendMessage: (text: string) => void;
}
export default function ChatInput({ onSendMessage }: ChatInputProps) {
  {
    const [messageText, setMessageText] = useState("");

    const handleSend = () => {
      if (messageText.trim()) {
        onSendMessage(messageText.trim());
        setMessageText("");
      }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent newline on Enter
        handleSend();
      }
    };

    return (
      <div className="bg-gray-100 p-3 border-t border-gray-200 flex items-center">
        {/* Attachment Button */}
        <button className="p-2 text-gray-500 hover:text-gray-700 mr-2 rounded-full hover:bg-gray-200">
          {/* Attachment Icon (Inline SVG or from library) */}
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
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>
        {/* Text Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
        />
        {/* Send Button */}
        <button
          onClick={handleSend}
          className="ml-3 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-gray-400"
          disabled={!messageText.trim()}
        >
          {/* Send Icon (Inline SVG or from library) */}
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
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    );
  }
}
