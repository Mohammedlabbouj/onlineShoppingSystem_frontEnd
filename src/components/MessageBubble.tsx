import { Message } from "@/types/Message";

// Message Bubble
interface MessageBubbleProps {
  message: Message;
}
export default function MessageBubblew({ message }: MessageBubbleProps) {
  const isMe = message.sender === "me";
  return (
    <div className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`py-2 px-4 rounded-xl max-w-[75%] ${
          isMe
            ? "bg-gray-200 text-gray-800 rounded-br-none"
            : "bg-green-500 text-white rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span
          className={`text-xs block text-right mt-1 ${isMe ? "text-gray-500" : "text-green-100 opacity-80"}`}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
