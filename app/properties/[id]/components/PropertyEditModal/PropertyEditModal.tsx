import { usePropertiesContext } from "@/app/context/PropertiesContext";
import "./PropertyEditModal.scss";

export default function PropertyEditModal() {
  const { getPropertyById, updateProperty } = usePropertiesContext();

  return (
    <div className="property-edit-modal">
      <h2>Modifier la propriété</h2>
        {/* Formulaire de modification de la propriété */}
    </div>
  );
}