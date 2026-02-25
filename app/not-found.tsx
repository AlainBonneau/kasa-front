import LinkButton from "./components/ui/LinkButton/LinkButton";
import "./not-found.scss";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <h1>404</h1>
        <p>
          Il semble que la page que vous cherchez ait pris des vacances… ou
          n’ait jamais existé.
        </p>
        <LinkButton name="Accueil" link="/" />
        <LinkButton name="Logements" link="/logements" />
      </div>
    </div>
  );
}
