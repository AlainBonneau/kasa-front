import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Conversation } from "./MessagingPageClient";

type MessagingSidebarProps = {
  conversations: Conversation[];
  selectedConversationId: number;
  onSelectConversation: (conversationId: number) => void;
};

export default function MessagingSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: MessagingSidebarProps) {
  return (
    <aside className="messaging-sidebar">
      <div className="messaging-sidebar-header">
        <Link href="/" className="back-button">
          <ArrowLeft size={16} />
          Retour
        </Link>
        <h1>Messages</h1>
      </div>

      <div className="messaging-conversations">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className={`conversation-item ${
              selectedConversationId === conversation.id ? "active" : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="avatar-placeholder" />

            <div className="conversation-content">
              <div className="conversation-top">
                <span className="conversation-name">
                  {conversation.userName}
                </span>
                <span className="conversation-time">{conversation.time}</span>
              </div>

              <div className="conversation-bottom">
                <span className="conversation-preview">
                  {conversation.preview}
                </span>
                {conversation.unread && <span className="unread-dot" />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
