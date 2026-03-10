"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Send, X } from "lucide-react";
import "./ChatModal.scss";

type Message = {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
};

type Conversation = {
  id: number;
  userName: string;
  preview: string;
  time: string;
  unread?: boolean;
  messages: Message[];
};

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const mockConversations: Conversation[] = [
  {
    id: 1,
    userName: "Utilisateur",
    preview: "Bonjour, votre appartement est-il disponible...",
    time: "11:04 am",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        time: "11:04pm",
      },
      {
        id: 2,
        sender: "other",
        text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        time: "11:04pm",
      },
      {
        id: 3,
        sender: "me",
        text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        time: "11:04pm",
      },
      {
        id: 4,
        sender: "other",
        text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        time: "11:04pm",
      },
      {
        id: 5,
        sender: "me",
        text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        time: "11:04pm",
      },
    ],
  },
  {
    id: 2,
    userName: "Utilisateur",
    preview: "Bonjour, votre appartement est-il disponible...",
    time: "11:04 am",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Bonjour, j’aimerais avoir plus d’informations sur le logement.",
        time: "10:12am",
      },
    ],
  },
  {
    id: 3,
    userName: "Utilisateur",
    preview: "Bonjour, votre appartement est-il disponible...",
    time: "11:04 am",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Merci pour votre retour.",
        time: "09:41am",
      },
    ],
  },
  {
    id: 4,
    userName: "Utilisateur",
    preview: "Bonjour, votre appartement est-il disponible...",
    time: "11:04 am",
    unread: false,
    messages: [],
  },
  {
    id: 5,
    userName: "Utilisateur",
    preview: "Bonjour, votre appartement est-il disponible...",
    time: "11:04 am",
    unread: false,
    messages: [],
  },
];

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<number>(
    mockConversations[0].id,
  );
  const [newMessage, setNewMessage] = useState("");

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId,
  );

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  function handleSelectConversation(conversationId: number) {
    setSelectedConversationId(conversationId);

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unread: false }
          : conversation,
      ),
    );
  }

  function handleSendMessage() {
    const trimmedMessage = newMessage.trim();

    if (!trimmedMessage || !selectedConversation) return;

    const message: Message = {
      id: Date.now(),
      sender: "me",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedConversationId
          ? {
              ...conversation,
              preview: trimmedMessage,
              time: message.time,
              messages: [...conversation.messages, message],
            }
          : conversation,
      ),
    );

    setNewMessage("");
  }

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div
        className="chat-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-modal-title"
      >
        <button
          className="chat-modal-close"
          onClick={onClose}
          aria-label="Fermer la messagerie"
        >
          <X size={18} />
        </button>

        <aside className="chat-sidebar">
          <button className="chat-back-button" onClick={onClose}>
            <ArrowLeft size={16} />
            Retour
          </button>

          <h2 id="chat-modal-title">Messages</h2>

          <div className="chat-conversations">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`chat-conversation-item ${
                  selectedConversationId === conversation.id ? "active" : ""
                }`}
                onClick={() => handleSelectConversation(conversation.id)}
              >
                <div className="avatar-placeholder" />

                <div className="conversation-content">
                  <div className="conversation-top">
                    <span className="conversation-name">
                      {conversation.userName}
                    </span>
                    <span className="conversation-time">
                      {conversation.time}
                    </span>
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

        <section className="chat-main">
          <div className="chat-messages">
            {selectedConversation?.messages.length ? (
              <>
                {selectedConversation.messages.map((message, index) => (
                  <div key={message.id}>
                    {index === 3 && (
                      <div className="chat-date-separator">
                        <span>03 Septembre 2025</span>
                      </div>
                    )}

                    <div
                      className={`chat-message-row ${
                        message.sender === "me" ? "me" : "other"
                      }`}
                    >
                      {message.sender === "other" && (
                        <div className="avatar-placeholder small" />
                      )}

                      <div className="chat-message-content">
                        <div className="chat-message-meta">
                          <span>Utilisateur</span>
                          <span>•</span>
                          <span>{message.time}</span>
                        </div>

                        <div className={`chat-bubble ${message.sender}`}>
                          {message.text}
                        </div>
                      </div>

                      {message.sender === "me" && (
                        <div className="avatar-placeholder small" />
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="chat-empty-state">
                Aucun message dans cette conversation.
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Envoyer un message"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />

            <button onClick={handleSendMessage} aria-label="Envoyer">
              <Send size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
