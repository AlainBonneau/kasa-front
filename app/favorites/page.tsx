import FavoritesComponent from "./components/FavoritesComponent/FavoritesComponent";
import "./page.scss";

export default function FavoritesPage() {
  return (
    <div className="favorites-page">
      <div className="favorites-page-header">
        <h1>Vos favoris</h1>
        <p>
          Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver
          ? Un simple clic et votre prochain séjour est en route.
        </p>
      </div>
      <FavoritesComponent />
    </div>
  );
}
