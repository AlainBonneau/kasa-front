"use client";

import { useMemo, useState } from "react";
import MessagingSidebar from "./MessagingSidebar";
import MessagingMain from "./MessagingMain";
import "./MessagingPageClient.scss";

export type Message = {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
};

export type Conversation = {
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
  {
    id: 3,
    userName: "Utilisateur",
    preview: "Bonjour, est-ce que le logement est proche du centre-ville ?",
    time: "9:45 am",
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Bonjour, est-ce que le logement est proche du centre-ville ?",
        time: "9:45am",
      },
      {
        id: 2,
        sender: "me",
        text: "Bonjour, oui il est à seulement 10 minutes en bus du centre-ville.",
        time: "9:50am",
      },
    ],
  },
  {
    id: 4,
    userName: "Utilisateur",
    preview: "Bonjour, est-ce que le logement dispose d’une connexion Wi-Fi ?",
    time: "8:30 am",
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Bonjour, est-ce que le logement dispose d’une connexion Wi-Fi ?",
        time: "8:30am",
      },
      {
        id: 2,
        sender: "me",
        text: "Bonjour, oui le logement dispose d’une connexion Wi-Fi gratuite.",
        time: "8:35am",
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
      <MessagingSidebar
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />

      <MessagingMain
        selectedConversation={selectedConversation}
        newMessage={newMessage}
        onChangeMessage={setNewMessage}
        onSendMessage={handleSendMessage}
        onBackToList={handleBackToList}
      />
    </div>
  );
}
