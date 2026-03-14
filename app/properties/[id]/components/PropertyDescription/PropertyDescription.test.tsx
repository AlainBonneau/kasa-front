/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyDescription from "./PropertyDescription";
import type { Property } from "@/app/types/property";

// Mock de l'icône MapPin
jest.mock("lucide-react", () => ({
  MapPin: () => <span data-testid="map-icon">📍</span>,
}));

describe("PropertyDescription", () => {
  // Objet property simulé pour les tests
  const property: Property = {
    title: "Appartement cosy",
    location: "Paris",
    description: "Un appartement très agréable au cœur de la ville.",
    equipments: ["WiFi", "Cuisine équipée", "Télévision"],
    tags: ["Centre-ville", "Romantique"],
    id: "zdazz",
    slug: "zeczec",
    cover: "",
    price_per_night: 50,
    postalCode: "",
    pictures: [],
    rating_avg: 0,
    rating_count: 0,
    host: {
      id: 99,
      name: "Test Host",
      picture: "",
    },
  };

  // Test 1 : vérifie que le titre du logement est affiché
  test("affiche le titre du logement", () => {
    render(<PropertyDescription property={property} />);

    const title = screen.getByText("Appartement cosy");

    expect(title).toBeInTheDocument();
  });

  // Test 2 : vérifie que la localisation est affichée
  test("affiche la localisation du logement", () => {
    render(<PropertyDescription property={property} />);

    const location = screen.getByText("Paris");

    expect(location).toBeInTheDocument();
  });

  // Test 3 : vérifie que la description est affichée
  test("affiche la description du logement", () => {
    render(<PropertyDescription property={property} />);

    const description = screen.getByText(
      "Un appartement très agréable au cœur de la ville.",
    );

    expect(description).toBeInTheDocument();
  });

  // Test 4 : vérifie que les équipements sont bien listés
  test("affiche les équipements du logement", () => {
    render(<PropertyDescription property={property} />);

    const wifi = screen.getByText("WiFi");
    const cuisine = screen.getByText("Cuisine équipée");
    const tv = screen.getByText("Télévision");

    expect(wifi).toBeInTheDocument();
    expect(cuisine).toBeInTheDocument();
    expect(tv).toBeInTheDocument();
  });

  // Test 5 : vérifie que les catégories/tags sont affichés
  test("affiche les catégories du logement", () => {
    render(<PropertyDescription property={property} />);

    const category1 = screen.getByText("Centre-ville");
    const category2 = screen.getByText("Romantique");

    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
  });
});
