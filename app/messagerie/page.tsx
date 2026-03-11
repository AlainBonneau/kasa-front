import MessagingPageClient from "./components/MessagingPageClient/MessagingPageClient";
import "./page.scss";

export default function MessagingPage() {
  return (
    <section className="messaging-page">
      <MessagingPageClient />
    </section>
  );
}