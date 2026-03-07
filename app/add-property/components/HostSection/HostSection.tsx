import type { HostSectionProps } from "@/app/types/propertyForm";
import "./HostSection.scss";
import { Plus } from "lucide-react";

export default function HostSection({
  hostName,
  setHostName,
  hostPicture,
  setHostPicture,
}: HostSectionProps) {
  return (
    <section className="property-host-section">
      <div className="input-label">
        <label htmlFor="hostName">Nom de l&apos;hôte</label>
        <input
          type="text"
          id="hostName"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
        />
      </div>

      <div className="image-field">
        <label htmlFor="hostPicture" className="field-label">
          Photo de profil
        </label>

        <div className="upload-row">
          <div className="fake-input">
            {hostPicture ? hostPicture.name : ""}
          </div>

          <label
            htmlFor="hostPicture"
            className="upload-btn"
            aria-label="Ajouter une image de l'hôte"
          >
            <Plus size={24} />
          </label>

          <input
            type="file"
            id="hostPicture"
            accept="image/*"
            className="hidden-file-input"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setHostPicture(e.target.files[0]);
              }
            }}
          />
        </div>
        <button
          type="button"
          className="add-more-link"
          onClick={() => document.getElementById("hostPicture")?.click()}
        >
          +Ajouter une image
        </button>
      </div>
    </section>
  );
}
