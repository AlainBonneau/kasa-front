import { ArrowLeft, Send } from "lucide-react";
import type { Conversation } from "./MessagingPageClient";

type MessagingMainProps = {
  selectedConversation?: Conversation;
  newMessage: string;
  onChangeMessage: (value: string) => void;
  onSendMessage: () => void;
  onBackToList: () => void;
};

export default function MessagingMain({
  selectedConversation,
  newMessage,
  onChangeMessage,
  onSendMessage,
  onBackToList,
}: MessagingMainProps) {
  return (
    <section className="messaging-main">
      <div className="messaging-mobile-topbar">
        <button type="button" className="back-button" onClick={onBackToList}>
          <ArrowLeft size={16} />
          Retour
        </button>
      </div>

      <div className="messaging-messages">
        {selectedConversation?.messages.map((message) => (
          <div
            key={message.id}
            className={`message-row ${message.sender === "me" ? "me" : "other"}`}
          >
            {message.sender === "other" && (
              <div className="avatar-placeholder small" />
            )}

            <div className="message-content">
              <div className="message-meta">
                <span>Utilisateur</span>
                <span>•</span>
                <span>{message.time}</span>
              </div>

              <div className={`message-bubble ${message.sender}`}>
                {message.text}
              </div>
            </div>

            {message.sender === "me" && (
              <div className="avatar-placeholder small" />
            )}
          </div>
        ))}
      </div>

      <div className="messaging-input">
        <input
          type="text"
          placeholder="Envoyer un message"
          value={newMessage}
          onChange={(e) => onChangeMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSendMessage();
            }
          }}
        />
        <button type="button" onClick={onSendMessage} aria-label="Envoyer">
          <Send size={16} />
        </button>
      </div>
    </section>
  );
}
