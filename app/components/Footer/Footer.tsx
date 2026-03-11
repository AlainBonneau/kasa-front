import Image from "next/image";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer-container">
      <Image src="/images/mobile-logo.png" alt="Logo" width={45} height={53} />
      <p>© 2025 Kasa. All rights reserved</p>
    </footer>
  );
}
