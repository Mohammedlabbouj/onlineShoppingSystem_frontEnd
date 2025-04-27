import { Conversation } from "@/types/Conversation";
import { Avatar } from "./Avater";

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}
export default function ConversationListItem({
  conversation,
  isSelected,
  onClick,
}: ConversationListItemProps) {
  return (
    <li
      className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg ${isSelected ? "bg-gray-100" : ""}`}
      onClick={onClick}
    >
      <Avatar
        src={conversation.avatarUrl}
        alt={conversation.name}
        size="md"
        className="mr-3"
      />
      <div className="flex-grow overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm truncate text-gray-800">
            {conversation.name}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {conversation.timestamp}
          </span>
        </div>
        <div className="flex justify-between items-start mt-1">
          <p className="text-sm text-gray-600 truncate pr-2">
            {conversation.lastMessage}
          </p>
          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <span className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
