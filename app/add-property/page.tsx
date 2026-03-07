"use client";

import { useState } from "react";
import Link from "next/link";
import PropertyInfoSection from "./components/PropertyInfoSection/PropertyInfoSection";
import PropertyImagesSection from "./components/PropertyImagesSection/PropertyImagesSection";
import HostSection from "./components/HostSection/HostSection";
import EquipmentSection from "./components/EquipmentSection/EquipmentSection";
import { ArrowLeft } from "lucide-react";
import "./page.scss";

export default function AddProperty() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [location, setLocation] = useState("");
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const [propertyPictures, setPropertyPictures] = useState<File[]>([]);
  const [hostName, setHostName] = useState("");
  const [hostPicture, setHostPicture] = useState<File | null>(null);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(
      `Titre: ${title}
      Description: ${description}
      Code postal: ${postalCode}
      Localisation: ${location}
      Image de couverture: ${coverPicture ? coverPicture.name : "Aucune"}
      Images du logement: ${propertyPictures.length > 0 ? propertyPictures.map((file) => file.name).join(", ") : "Aucune"}
      Nom de l'hôte: ${hostName}
      Photo de profil de l'hôte: ${hostPicture ? hostPicture.name : "Aucune"}`,
      `Équipements: ${equipments.length > 0 ? equipments.join(", ") : "Aucun"}`,
    );
  }

  return (
    <div className="add-property-page">
      <Link href="/">
        {" "}
        <ArrowLeft className="arrow-left-icon" /> Retour
      </Link>
      <form onSubmit={handleFormSubmit}>
        <div className="form-header">
          <h1>Ajouter une propriété</h1>
          <button className="add-property-btn" type="submit">
            Ajouter
          </button>
        </div>
        <section className="form-top">
          <PropertyInfoSection
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            location={location}
            setLocation={setLocation}
          />
          <div className="form-top-right">
            <PropertyImagesSection
              coverPicture={coverPicture}
              setCoverPicture={setCoverPicture}
              propertyPictures={propertyPictures}
              setPropertyPictures={setPropertyPictures}
            />
            <HostSection
              hostName={hostName}
              setHostName={setHostName}
              hostPicture={hostPicture}
              setHostPicture={setHostPicture}
            />
          </div>
        </section>
        <section className="form-bottom">
          {/* Sections pour équipements et catégories à ajouter ici */}
          <EquipmentSection
            equipments={equipments}
            setEquipments={setEquipments}
          />
          {/* // CategoriesSection à ajouter ici */}
        </section>
      </form>
    </div>
  );
}
