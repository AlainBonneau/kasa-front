import Image from "next/image";
import "./PropertyPicture.scss";

export default function PropertyPicture({ pictures }: { pictures: string[] }) {
  if (!pictures || pictures.length === 0) {
    return null;
  }

  return (
    <div className="property-picture-container">
      <div className="picture-left">
        <Image
          src={pictures[0]}
          alt="Photo principale du logement"
          className="property-picture-main"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="picture-right">
        {pictures.slice(1).map((picture, index) => (
          <div key={index} className="small-picture-wrapper">
            <Image
              src={picture}
              alt={`Photo ${index + 2} du logement`}
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
