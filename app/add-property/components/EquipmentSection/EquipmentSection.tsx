import type { EquipmentSectionProps } from "@/app/types/propertyForm";
import "./EquipmentSection.scss";
import { EQUIPMENTS } from "@/app/data/equipments";

export default function EquipmentSection({
  equipments,
  setEquipments,
}: EquipmentSectionProps) {
  const toggleEquipment = (equipment: string) => {
    if (equipments.includes(equipment)) {
      setEquipments(equipments.filter((e) => e !== equipment));
    } else {
      setEquipments([...equipments, equipment]);
    }
  };

  return (
    <section className="property-equipment-section">
      <h2>Équipements</h2>

      <div className="tag-equiments-container">
        {EQUIPMENTS.map((equipment) => (
          <label key={equipment} className="equipment-tag">
            <input
              type="checkbox"
              checked={equipments.includes(equipment)}
              onChange={() => toggleEquipment(equipment)}
            />

            <span>{equipment}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
