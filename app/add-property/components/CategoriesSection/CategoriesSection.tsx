"use client";

import { useState } from "react";
import type { CategoriesSectionProps } from "@/app/types/propertyForm";
import { CATEGORIES } from "@/app/data/cartegories";
import { Plus } from "lucide-react";
import "./CategoriesSection.scss";

export default function CategoriesSection({
  categories,
  setCategories,
  customCategories,
  setCustomCategories,
}: CategoriesSectionProps) {
  const [newCategory, setNewCategory] = useState("");

  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleAddCustomCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) return;

    const alreadyExists =
      categories.includes(trimmedCategory) ||
      customCategories.includes(trimmedCategory) ||
      CATEGORIES.includes(trimmedCategory);

    if (alreadyExists) {
      setNewCategory("");
      return;
    }

    setCustomCategories([...customCategories, trimmedCategory]);
    setNewCategory("");
  };

  return (
    <section className="property-categories-section">
      <h2>Catégories</h2>

      <div className="categories-container">
        {CATEGORIES.map((category) => (
          <label key={category} className="category-tag">
            <input
              type="checkbox"
              checked={categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            <span>{category}</span>
          </label>
        ))}

        {customCategories.map((category) => (
          <label key={category} className="category-tag custom-tag">
            <input
              type="checkbox"
              checked={categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="custom-categories-container">
        <div className="input-label">
          <label htmlFor="custom-category">
            Ajouter une catégorie personnalisée
          </label>

          <div className="custom-category-row">
            <input
              type="text"
              id="custom-category"
              placeholder="Nouveau tag"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <button
              type="button"
              className="add-category-btn"
              onClick={handleAddCustomCategory}
              aria-label="Ajouter une catégorie personnalisée"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="add-tag-link"
          onClick={handleAddCustomCategory}
        >
          +Ajouter un tag
        </button>
      </div>
    </section>
  );
}
