import type { PropertyInfoSectionProps } from "@/app/types/propertyForm";
import "./PropertyInfoSection.scss";

export default function PropertyInfoSection({
  title,
  setTitle,
  description,
  setDescription,
  postalCode,
  setPostalCode,
  location,
  setLocation,
}: PropertyInfoSectionProps) {
  return (
    <div className="property-info-section">
      <div className="input-label">
        <label htmlFor="title">Titre de la propriété</label>
        <input
          type="text"
          id="title"
          placeholder="Ex : Appartement cosy au coeur de Paris"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-label">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Décrivez votre propriété en détail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-label">
        <label htmlFor="postalCode">Code postal</label>
        <input
          type="number"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div className="input-label">
        <label htmlFor="location">Localisation</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </div>
  );
}
