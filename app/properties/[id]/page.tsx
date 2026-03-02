import { getPropertyById } from "@/app/services/properties.service";
import PropertyPicture from "./components/PropertyPicture/PropertyPicture";
import Link from "next/link";
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
    console.log("Logement récupéré :", property.pictures);
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
  }

  if (!property) {
    return <p>Logement introuvable</p>;
  }

  return (
    <section className="property-detail-page-container">
      <Link href="/" className="back-link">
        Retour aux annonces
      </Link>
      <div className="property-detail-left">
        <PropertyPicture pictures={property.pictures} />
      </div>
      <div className="property-detail-right">
        {/* // mettre la partie de l'hôte avec photo etc par la suite */}
      </div>
    </section>
  );
}
