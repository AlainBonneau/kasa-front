"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { createProperty } from "../services/properties.service";
import { uploadImage } from "../services/upload.service";
import PropertyInfoSection from "./components/PropertyInfoSection/PropertyInfoSection";
import PropertyImagesSection from "./components/PropertyImagesSection/PropertyImagesSection";
import HostSection from "./components/HostSection/HostSection";
import EquipmentSection from "./components/EquipmentSection/EquipmentSection";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import ProtectedRoute from "../components/ProtectedRoute";
import "./page.scss";

export default function AddProperty() {
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price_per_night, setPricePerNight] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [location, setLocation] = useState("");
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const [propertyPictures, setPropertyPictures] = useState<File[]>([]);
  const [hostName, setHostName] = useState("");
  const [hostPicture, setHostPicture] = useState<File | null>(null);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.id) {
      setError("Utilisateur non connecté.");
      return;
    }

    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      let coverUrl = "";
      const picturesUrls: string[] = [];

      if (coverPicture) {
        const uploadedCover = await uploadImage({
          file: coverPicture,
          purpose: "property-cover",
        });
        coverUrl = uploadedCover.url;
      }

      for (const picture of propertyPictures) {
        const uploadedPicture = await uploadImage({
          file: picture,
          purpose: "property-picture",
        });
        picturesUrls.push(uploadedPicture.url);
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        price_per_night: Number(price_per_night || 80),
        host_id: user.id,
        cover: coverUrl || null,
        pictures: picturesUrls,
        equipments,
        tags: [...categories, ...customCategories],
      };

      console.log("CREATE PROPERTY PAYLOAD:", payload);

      await createProperty(payload);

      setTitle("");
      setDescription("");
      setPricePerNight("");
      setPostalCode("");
      setLocation("");
      setCoverPicture(null);
      setPropertyPictures([]);
      setHostName("");
      setHostPicture(null);
      setEquipments([]);
      setCategories([]);
      setCustomCategories([]);
    } catch (err) {
      console.error("Erreur lors de la création de la propriété :", err);
      setError("Impossible de créer la propriété.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="add-property-page">
        <Link href="/">
          <ArrowLeft className="arrow-left-icon" /> Retour
        </Link>

        <form onSubmit={handleFormSubmit}>
          <div className="form-header">
            <h1>Ajouter une propriété</h1>
            <button
              className="add-property-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ajout en cours..." : "Ajouter"}
            </button>
          </div>

          {error && <p className="form-error">{error}</p>}

          <section className="addproperty-form">
            <div className="form-top">
              <PropertyInfoSection
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                price_per_night={price_per_night}
                setPricePerNight={setPricePerNight}
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
            </div>

            <div className="form-bottom">
              <EquipmentSection
                equipments={equipments}
                setEquipments={setEquipments}
              />

              <CategoriesSection
                categories={categories}
                setCategories={setCategories}
                customCategories={customCategories}
                setCustomCategories={setCustomCategories}
              />
            </div>
          </section>
        </form>
      </div>
    </ProtectedRoute>
  );
}
