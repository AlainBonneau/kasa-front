"use client";

import { useState } from "react";
import Image from "next/image";
import Loader from "@/app/components/ui/Loader/Loader";
import "./PropertyPicture.scss";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const FALLBACK_IMAGE =
  "https://rightathomerealtyinc.com/image/PropertyPhoto/housedefault.png";

function getImageUrl(src?: string) {
  if (!src) return FALLBACK_IMAGE;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${BACKEND_URL}${src}`;
}

export default function PropertyPicture({
  cover,
  pictures,
}: {
  cover?: string;
  pictures: string[];
}) {
  const [mainLoaded, setMainLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  if (!pictures || pictures.length === 0) {
    return null;
  }

  const mainPicture = cover || pictures[0];

  return (
    <div className="property-picture-container">
      <div className="picture-left">
        {!mainLoaded && <Loader />}

        <Image
          src={getImageUrl(mainPicture)}
          alt="Photo principale du logement"
          className={`property-picture-main ${mainLoaded ? "is-visible" : "is-hidden"}`}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          unoptimized
          onLoad={() => setMainLoaded(true)}
        />
      </div>

      <div className="picture-right">
        {pictures.map((picture, index) => (
          <div key={index} className="small-picture-wrapper">
            {!loadedImages[index] && (
              <div className="picture-loader">
                <Loader />
              </div>
            )}

            <Image
              src={getImageUrl(picture)}
              alt={`Photo ${index + 1} du logement`}
              className={loadedImages[index] ? "is-visible" : "is-hidden"}
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
              unoptimized
              onLoad={() =>
                setLoadedImages((prev) => ({
                  ...prev,
                  [index]: true,
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
