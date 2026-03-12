import MessagingPageClient from "./components/MessagingPageClient/MessagingPageClient";
import ProtectedRoute from "../components/ProtectedRoute";
import "./page.scss";

export default function MessagingPage() {
  return (
    <ProtectedRoute>
      <section className="messaging-page">
        <MessagingPageClient />
      </section>
    </ProtectedRoute>
  );
}
