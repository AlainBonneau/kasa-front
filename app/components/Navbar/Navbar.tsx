import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <header className="header">
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
          <Link href="/create-property" className="add-property">
            +Ajouter un logement
          </Link>

          <div className="navbar-icons">
            <Link href="/favorites">
              <Heart size={18} />
            </Link>
            <Link href="/chat">
              <MessageSquare size={18} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
