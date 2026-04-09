import { getPropertyById } from "@/app/services/properties.service";
import PropertyPicture from "./components/PropertyPicture/PropertyPicture";
import PropertyDescription from "./components/PropertyDescription/PropertyDescription";
import PropertyHost from "./components/PropertyHost/PropertyHost";
import PropertyActions from "./components/PropertyActions/PropertyActions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    console.error("Erreur lors de la récupération du logement :", error);
    property = null;
  }

  if (!property) {
    return <p className="no-property">Logement introuvable</p>;
  }

  return (
    <section className="property-detail-page-container">
      <Link href="/" className="back-link">
        <ArrowLeft className="arrow-left-icon" /> Retour aux annonces
      </Link>

      <div className="property-detail-wrapper">
        <div className="property-detail-left">
          <PropertyPicture
            cover={property.cover}
            pictures={property.pictures}
          />
          <PropertyActions property={property} />
          <PropertyDescription property={property} />
        </div>

        <div className="property-detail-right">
          <PropertyHost host={property.host} rating_avg={property.rating_avg} />
        </div>
      </div>
    </section>
  );
}
