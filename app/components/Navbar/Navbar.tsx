"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ChatModal from "../ChatModal/ChatModal";
import "./Navbar.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // useEffect qui bloque le scroll du body lorsque le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      {/* DESKTOP */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
        </div>

        <div className="navbar-center">
          <Image
            src="/images/logo.png"
            alt="Kasa Logo"
            width={113}
            height={40}
          />
        </div>

        <div className="navbar-right">
          <Link href="/add-property" className="add-property">
            +Ajouter un logement
          </Link>

          <div className="navbar-icons">
            <Link href="/favorites" aria-label="Favoris">
              <Heart size={18} />
            </Link>
            <button aria-label="Messagerie" onClick={() => setIsChatOpen(true)}>
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <nav className="mobile-bar" aria-label="Navigation mobile">
        <Image
          src="/images/mobile-logo.png"
          alt="Kasa Logo"
          width={45}
          height={53}
          priority
        />

        <button
          className="burger"
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Overlay */}
        <div
          className={`mobile-overlay ${isOpen ? "open" : ""}`}
          onClick={closeMenu}
        />

        {/* Panel */}
        <div
          id="mobile-menu"
          className={`mobile-menu ${isOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="mobile-menu-header">
            <span className="sr-only">Menu</span>
            <Image
              src="/images/mobile-logo.png"
              alt="Kasa Logo"
              width={45}
              height={53}
            />
            <button
              className="close"
              type="button"
              aria-label="Fermer"
              onClick={closeMenu}
            >
              <X size={22} />
            </button>
          </div>

          <div className="mobile-links">
            <Link href="/" onClick={closeMenu}>
              Accueil
            </Link>
            <Link href="/about" onClick={closeMenu}>
              À propos
            </Link>
            <button
              onClick={() => {
                closeMenu();
                setIsChatOpen(true);
              }}
            >
              Messagerie
            </button>
            <Link href="/favorites" onClick={closeMenu}>
              Favoris
            </Link>
          </div>

          <Link
            href="/create-property"
            className="mobile-cta"
            onClick={closeMenu}
          >
            Ajouter un logement
          </Link>
        </div>
      </nav>
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </header>
  );
}
