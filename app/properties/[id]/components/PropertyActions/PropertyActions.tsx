"use client";

import { useState } from "react";
import PropertyEditModal from "../PropertyEditModal/PropertyEditModal";
import PropertyDelete from "../PropertyDelete/PropertyDelete";
import { useAuthContext } from "@/app/context/AuthContext";
import type { Property } from "@/app/types/property";
import "./PropertyActions.scss";

export default function PropertyActions({
  property,
}: {
  property: Property;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user, status } = useAuthContext();

  if (status === "loading") {
    return null;
  }

  if (user?.role !== "owner") {
    return null;
  }

  return (
    <>
      <div className="property-actions">
        <button
          type="button"
          className="edit-btn"
          onClick={() => setIsEditOpen(true)}
        >
          Modifier
        </button>

        <PropertyDelete id={property.id} />
      </div>

      <PropertyEditModal
        property={property}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
}