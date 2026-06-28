import { useState } from "react";
import type { CategoryFilter, CategoryOption } from "../../types/animal";
import "./CategoryCarousel.css";

interface CategoryCarouselProps {
  categories: CategoryOption[];
  selected: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

interface CategoryItemProps {
  category: CategoryOption;
  isActive: boolean;
  onSelect: (id: CategoryFilter) => void;
}

function CategoryItem({ category, isActive, onSelect }: CategoryItemProps) {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <button
      type="button"
      className={`category-item${isActive ? " category-item--active" : ""}`}
      onClick={() => onSelect(category.id)}
      aria-pressed={isActive}
    >
      <span className="category-item__icon-wrap">
        {imgError ? (
          <span className="category-item__placeholder" aria-hidden="true">
            {category.label.charAt(0)}
          </span>
        ) : (
          <img
            className="category-item__icon"
            src={category.icon}
            alt=""
            onError={() => setImgError(true)}
          />
        )}
      </span>

      <span className="category-item__label">{category.label}</span>
    </button>
  );
}

function CategoryCarousel({
  categories,
  selected,
  onSelect,
}: CategoryCarouselProps) {
  return (
    <nav className="category-carousel" aria-label="Filtrar animais por espécie">
      <ul className="category-carousel__track">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryItem
              category={category}
              isActive={selected === category.id}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryCarousel;