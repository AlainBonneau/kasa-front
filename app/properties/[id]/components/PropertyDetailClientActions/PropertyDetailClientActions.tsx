"use client";

import { useState } from "react";
import ChatModal from "@/app/components/ChatModal/ChatModal";
import "./PropertyDetailClientActions.scss";

type PropertyDetailClientActionsProps = {
  property: {
    id: string;
    title?: string;
    host?: {
      name?: string;
    };
  };
};

export default function PropertyDetailClientActions({
  property,
}: PropertyDetailClientActionsProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="contact-host-button"
        onClick={() => setIsChatOpen(true)}
      >
        Contacter l’hôte
      </button>

      <button
        type="button"
        className="contact-host-button"
        onClick={() => setIsChatOpen(true)}
      >
        Envoyer un message
      </button>

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
