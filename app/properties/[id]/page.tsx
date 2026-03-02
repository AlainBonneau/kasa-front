import { getPropertyById } from "@/app/services/properties.service";
import "./page.scss";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let property = null;

  try {
    property = await getPropertyById(id);
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
  }

  if (!property) {
    return <p>Logement introuvable</p>;
  }

  return (
    <div className="property-detail-page-container">
      <h1>{property.title}</h1>
      <p>Prix : {property.price_per_night} €</p>
      <p>ID : {property.id}</p>
    </div>
  );
}