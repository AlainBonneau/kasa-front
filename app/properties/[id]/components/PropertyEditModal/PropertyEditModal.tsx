"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { usePropertiesContext } from "@/app/context/PropertiesContext";
import type { Property } from "@/app/types/property";
import "./PropertyEditModal.scss";

type PropertyEditModalProps = {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
};

export default function PropertyEditModal({
  property,
  isOpen,
  onClose,
}: PropertyEditModalProps) {
  const { updateProperty } = usePropertiesContext();
  const router = useRouter();

  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [cover, setCover] = useState(property.cover ?? "");
  const [location, setLocation] = useState(property.location);
  const [pricePerNight, setPricePerNight] = useState(
    String(property.price_per_night),
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setTitle(property.title);
    setDescription(property.description);
    setCover(property.cover ?? "");
    setLocation(property.location);
    setPricePerNight(String(property.price_per_night));
    setError(null);
  }, [isOpen, property]);

  function handleClickEscape(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    if (!description.trim()) {
      setError("La description est obligatoire.");
      return;
    }

    if (!location.trim()) {
      setError("La localisation est obligatoire.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await updateProperty(property.id, {
        title: title.trim(),
        description: description.trim(),
        cover: cover.trim(),
        location: location.trim(),
        host_id: property.host.id,
        price_per_night: Number(pricePerNight) || 0,
        pictures: [],
        equipments: [],
        tags: [],
      });

      router.refresh();
      onClose();
    } catch {
      setError("Impossible de modifier la propriété.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="property-edit-modal-overlay"
      onClick={onClose}
      role="presentation"
      onKeyDown={handleClickEscape}
      tabIndex={-1}
    >
      <div
        className="property-edit-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-edit-modal-title"
      >
        <div className="property-edit-modal__header">
          <h2 id="property-edit-modal-title">Modifier la propriété</h2>
          <button
            type="button"
            className="property-edit-modal__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <form className="property-edit-modal__form" onSubmit={handleSubmit}>
          {error && <p className="property-edit-modal__error">{error}</p>}

          <div className="property-edit-modal__field">
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="property-edit-modal__field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="property-edit-modal__field">
            <label htmlFor="cover">Image de couverture (URL)</label>
            <input
              id="cover"
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>

          <div className="property-edit-modal__field">
            <label htmlFor="location">Localisation</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="property-edit-modal__field">
            <label htmlFor="pricePerNight">Prix par nuit</label>
            <input
              id="pricePerNight"
              type="number"
              min="0"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
            />
          </div>

          <div className="property-edit-modal__actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button type="submit" className="save-btn" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
