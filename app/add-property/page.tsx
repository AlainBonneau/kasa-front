"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <div className="add-property-page">
      <Link href="/">
        {" "}
        <ArrowLeft className="arrow-left-icon" /> Retour
      </Link>
      <form>
        <div className="form-header">
          <h1>Ajouter une propriété</h1>
          <button className="add-property-btn">Ajouter</button>
        </div>
      </form>
    </div>
  );
}
