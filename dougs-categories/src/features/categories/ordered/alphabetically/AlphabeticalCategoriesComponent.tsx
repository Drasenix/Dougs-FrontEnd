import { ICategory } from "../../../../services/interfaces/Categorie";
import "../../../../styles/features/categories/ordered/alphabetically/AlphabeticalCategoriesComponent.css";
import { CategoryComponent } from "../../CategoryComponent";
import { CategoryItemComponent } from "../../CategoryItemComponent";
import { OrderingTypes } from "../../MainComponent";
import { useState } from "react";

interface IAlpheticalProps {
  categories: ICategory[];
}

export function AlphabeticalCategoriesComponent(props: IAlpheticalProps) {
  const [selectedCategory, setSelectedCategory] = useState(-1);

  function changeSelectedCategory(id_category: number) {
    setSelectedCategory(id_category);
  }

  return (
    <ul className="alphabetical-categories-list">
      {props.categories.map((category) => (
        <CategoryItemComponent
          key={category.id}
          category={category}
          isSelected={category.id === selectedCategory}
          selectCategory={changeSelectedCategory}
        >
          <CategoryComponent
            ordering={OrderingTypes.Alphabetical}
            key={category.id}
            category={category}
          />
        </CategoryItemComponent>
      ))}
    </ul>
  );
}
