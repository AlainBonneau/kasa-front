/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyPicture from "./PropertyPicture";

// Dans l'environnement de test, on remplace <Image /> par une simple balise <img>
// pour éviter les comportements spécifiques de Next.js.
jest.mock("next/image", () => {
  return function Image({
    fill,
    unoptimized,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    unoptimized?: boolean;
  }) {
    return <img {...props} />;
  };
});

describe("PropertyPicture", () => {
  // Test 1 : Vérifie que l'image principale est bien affichée
  test("affiche l'image principale du logement", () => {
    render(
      <PropertyPicture
        cover="/cover.jpg"
        pictures={["/img1.jpg", "/img2.jpg"]}
      />,
    );

    const image = screen.getByAltText("Photo principale du logement");

    expect(image).toBeInTheDocument();
  });

  // Test 2 : Vérifie que les images secondaires sont rendues
  test("affiche toutes les images secondaires du logement", () => {
    render(
      <PropertyPicture
        cover="/cover.jpg"
        pictures={["/img1.jpg", "/img2.jpg"]}
      />,
    );

    const image1 = screen.getByAltText("Photo 1 du logement");
    const image2 = screen.getByAltText("Photo 2 du logement");

    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
  });

  // Test 3 : Vérifie que le composant n'affiche rien si aucune image n'est fournie
  test("ne rend rien si la liste des images est vide", () => {
    const { container } = render(
      <PropertyPicture pictures={[]} cover="/cover.jpg" />,
    );

    // Si aucune image n'est disponible, le composant retourne null
    expect(container.firstChild).toBeNull();
  });

  // Test 4 : Vérifie que la première image est utilisée si aucune cover n'est définie
  test("utilise la première image comme cover si aucune cover n'est fournie", () => {
    render(<PropertyPicture pictures={["/img1.jpg", "/img2.jpg"]} />);

    // L'image principale doit toujours être affichée
    const image = screen.getByAltText("Photo principale du logement");

    expect(image).toBeInTheDocument();
  });
});
