import Image from "next/image";
import "./PropertyPicture.scss";

const BACKEND_URL = "http://localhost:8000";
const FALLBACK_IMAGE =
  "https://rightathomerealtyinc.com/image/PropertyPhoto/housedefault.png";

function getImageUrl(src?: string) {
  if (!src) return FALLBACK_IMAGE;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${BACKEND_URL}${src}`;
}

export default function PropertyPicture({ pictures }: { pictures: string[] }) {
  if (!pictures || pictures.length === 0) {
    return null;
  }

  return (
    <div className="property-picture-container">
      <div className="picture-left">
        <Image
          src={getImageUrl(pictures[0])}
          alt="Photo principale du logement"
          className="property-picture-main"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>

      <div className="picture-right">
        {pictures.slice(1).map((picture, index) => (
          <div key={index} className="small-picture-wrapper">
            <Image
              src={getImageUrl(picture)}
              alt={`Photo ${index + 2} du logement`}
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
