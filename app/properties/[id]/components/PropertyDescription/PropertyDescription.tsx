import type { Property } from "@/app/types/property";
import { MapPin } from "lucide-react";
import "./PropertyDescription.scss";

export default function PropertyDescription({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="property-description-container">
      <div className="property-description-header">
        <h2 className="property-title">{property.title}</h2>
        <p className="property-location">
          <MapPin className="location-icon" /> {property.location}
        </p>
      </div>

      <p className="property-description">{property.description}</p>
      
      <div className="property-stuff-container">
        <h4>Équipements</h4>
        <ul className="property-stuff-list">
          {property.equipments.map((item, index) => (
            <li key={index} className="property-stuff-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="property-categories-container">
        <h4>Catégories</h4>
        <ul className="property-categories-list">
          {property.tags.map((category, index) => (
            <li key={index} className="property-category-item">
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
