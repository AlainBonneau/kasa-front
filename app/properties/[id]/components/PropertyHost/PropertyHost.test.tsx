/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyHost from "./PropertyHost";
import { ClassAttributes, ImgHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

// Mock de next/image
jest.mock("next/image", () => {
  return function Image(
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>,
  ): React.ReactElement {
    return <img {...props} />;
  };
});

// Mock de l'icône Star (lucide-react)
jest.mock("lucide-react", () => ({
  Star: () => <span data-testid="star-icon">⭐</span>,
}));

describe("PropertyHost", () => {
  const host = {
    id: 1,
    name: "Jean Dupont",
    picture: "/host.jpg",
  };

  const rating = 4.8;

  // Test 1 : Vérifie que le nom de l'hôte est bien affiché
  test("affiche le nom de l'hôte", () => {
    render(<PropertyHost host={host} rating_avg={rating} />);

    const hostName = screen.getByText("Jean Dupont");

    expect(hostName).toBeInTheDocument();
  });

  // Test 2 : Vérifie que la photo de l'hôte est affichée
  test("affiche la photo de l'hôte", () => {
    render(<PropertyHost host={host} rating_avg={rating} />);

    const image = screen.getByAltText("Photo de Jean Dupont");

    expect(image).toBeInTheDocument();
  });

  // Test 3 : Vérifie que la note moyenne est affichée
  test("affiche la note moyenne de l'hôte", () => {
    render(<PropertyHost host={host} rating_avg={rating} />);

    const ratingText = screen.getByText("4.8");

    expect(ratingText).toBeInTheDocument();
  });
});
