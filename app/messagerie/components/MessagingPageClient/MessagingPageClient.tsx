"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import "./MessagingPageClient.scss";

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
        sender: "me",
        text: "Bonjour, oui il est encore disponible.",
        time: "11:06pm",
      },
    ],
  },
  {
    id: 2,
    userName: "Utilisateur",
    preview: "Bonjour, j’aimerais avoir plus d’informations...",
    time: "10:12 am",
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
];

export default function MessagingPageClient() {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(
    mockConversations[0].id,
  );
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [newMessage, setNewMessage] = useState("");

  const selectedConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === selectedConversationId,
      ),
    [conversations, selectedConversationId],
  );

  function handleSelectConversation(conversationId: number) {
    setSelectedConversationId(conversationId);
    setMobileView("chat");

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unread: false }
          : conversation,
      ),
    );
  }

  function handleBackToList() {
    setMobileView("list");
  }

  function handleSendMessage() {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const message: Message = {
      id: Date.now(),
      sender: "me",
      text: trimmed,
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
              preview: trimmed,
              time: message.time,
              messages: [...conversation.messages, message],
            }
          : conversation,
      ),
    );

    setNewMessage("");
  }

  return (
    <div
      className={`messaging-layout ${
        mobileView === "list" ? "mobile-show-list" : "mobile-show-chat"
      }`}
    >
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
              onClick={() => handleSelectConversation(conversation.id)}
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

      <section className="messaging-main">
        <div className="messaging-mobile-topbar">
          <button
            type="button"
            className="back-button"
            onClick={handleBackToList}
          >
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
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            aria-label="Envoyer"
          >
            <Send size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
