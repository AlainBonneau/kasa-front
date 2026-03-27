"use client";

import { usePropertiesContext } from "@/app/context/PropertiesContext";
import { useAuthContext } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import "./PropertyDelete.scss";

export default function PropertyDelete({ id }: { id: string }) {
  const { deleteProperty } = usePropertiesContext();
  const { role } = useAuthContext();

  if (role !== "owner") {
    return null;
  }
  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce logement ?")) {
      try {
        await deleteProperty(id);
        toast.success("Logement supprimé avec succès !");
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors de la suppression du logement.",
        );
        console.error(
          (error as Error).message ||
            "Une erreur est survenue lors de la suppression du logement.",
        );
      }
    }
  };

  return (
    <div className="property-delete-container">
      <button onClick={handleDelete}>Supprimer le logement</button>
    </div>
  );
}
