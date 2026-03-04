import Link from "next/link";
import Image from "next/image";
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
          src={host.picture}
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
        <Link href="/">Contacter l&apos;hôte</Link>
        <Link href="/">Envoyer un message</Link>
      </div>
    </div>
  );
}
