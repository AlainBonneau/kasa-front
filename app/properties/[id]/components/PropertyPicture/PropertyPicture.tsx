import Image from "next/image";
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
  if (!pictures || pictures.length === 0) {
    return null;
  }

  if (!cover) {
    cover = pictures[0];
  }

  return (
    <div className="property-picture-container">
      <div className="picture-left">
        <Image
          src={getImageUrl(cover)}
          alt="Photo principale du logement"
          className="property-picture-main"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>

      <div className="picture-right">
        {pictures.map((picture, index) => (
          <div key={index} className="small-picture-wrapper">
            <Image
              src={getImageUrl(picture)}
              alt={`Photo ${index + 1} du logement`}
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
