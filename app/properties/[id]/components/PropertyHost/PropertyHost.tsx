import Image from "next/image";
import LinkButton from "@/app/components/ui/LinkButton/LinkButton";
import type { Property } from "@/app/types/property";
import { Star } from "lucide-react";
import "./PropertyHost.scss";

export default function PropertyHost({
  host,
  rating_avg,
}: {
  host: Property["host"];
  rating_avg: number;
}) {
  return (
    <div className="property-host-container">
      <h2>Votre hôte</h2>

      <div className="host-infos-container">
        <Image
          src={
            host.picture ||
            "https://rightathomerealtyinc.com/image/PropertyPhoto/housedefault.png"
          }
          alt={`Photo de ${host.name}`}
          width={82}
          height={82}
          className="host-picture"
        />
        <h5>{host.name}</h5>
        <span>
          <Star className="rating-icon" /> {rating_avg}
        </span>
      </div>

      <div className="property-host-link">
        <LinkButton
          name="Contacter l’hôte"
          link={`/messagerie`}
          newTab={false}
        />
        <LinkButton
          name="Envoyer un message"
          link={`/messagerie`}
          newTab={false}
        />
      </div>
    </div>
  );
}
