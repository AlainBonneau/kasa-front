import type { PropertyImagesSectionProps } from "@/app/types/propertyForm";
import { Plus } from "lucide-react";
import "./PropertyImagesSection.scss";

export default function PropertyImagesSection({
  coverPicture,
  setCoverPicture,
  propertyPictures,
  setPropertyPictures,
}: PropertyImagesSectionProps) {
  return (
    <section className="property-images-section">
      <div className="image-field">
        <label htmlFor="coverPicture" className="field-label">
          Image de couverture
        </label>

        <div className="upload-row">
          <div className="fake-input">
            {coverPicture ? coverPicture.name : ""}
          </div>

          <label
            htmlFor="coverPicture"
            className="upload-btn"
            aria-label="Ajouter une image de couverture"
          >
            <Plus size={24} />
          </label>

          <input
            type="file"
            id="coverPicture"
            accept="image/*"
            className="hidden-file-input"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setCoverPicture(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>

      <div className="image-field">
        <label htmlFor="propertyPictures" className="field-label">
          Image du logement
        </label>

        <div className="upload-row">
          <div className="fake-input">
            {propertyPictures.length > 0
              ? `${propertyPictures.length} image(s) sélectionnée(s)`
              : ""}
          </div>

          <label
            htmlFor="propertyPictures"
            className="upload-btn"
            aria-label="Ajouter des images du logement"
          >
            <Plus size={24} />
          </label>

          <input
            type="file"
            multiple
            id="propertyPictures"
            className="hidden-file-input"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files) return;
              const newFiles = Array.from(e.target.files);
              setPropertyPictures((prev) => [...prev, ...newFiles]);
            }}
          />
        </div>

        <button
          type="button"
          className="add-more-link"
          onClick={() => document.getElementById("propertyPictures")?.click()}
        >
          +Ajouter une image
        </button>
      </div>
    </section>
  );
}
