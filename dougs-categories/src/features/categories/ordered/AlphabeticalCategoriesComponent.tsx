import { ICategorie } from "../../../services/interfaces/Categorie";
import "../../../assets/features/categories/ordered/AlphabeticalCategoriesComponent.css";
import { AlphabeticalCategoryComponent } from "./AlphabeticalCategoryComponent";
import { useState } from "react";

interface IAlpheticalProps {
  categories: ICategorie[];
}

function orderCategoriesAlphabetically(categories: ICategorie[]) {
  categories.sort(function (a, b) {
    if (a.wording < b.wording) {
      return -1;
    }
    if (a.wording > b.wording) {
      return 1;
    }
    return 0;
  });

  return categories;
}

export function AlphabeticalCategoriesComponent(props: IAlpheticalProps) {
  const [selectedCategory, setSelectedCategorie] = useState(-1);

  function changeSelectedCategory(id_category: number) {
    setSelectedCategorie(id_category);
  }

  const categories: ICategorie[] = orderCategoriesAlphabetically(
    props.categories
  );

  return (
    <ul className="alphabetical-categories-list">
      {categories.map((category) => (
        <AlphabeticalCategoryComponent
          key={category.id}
          category={category}
          isSelected={category.id === selectedCategory}
          selectCategory={changeSelectedCategory}
        ></AlphabeticalCategoryComponent>
      ))}
    </ul>
  );
}
