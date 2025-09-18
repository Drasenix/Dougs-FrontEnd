import { ICategory } from "../../../../services/interfaces/Categorie";
import "../../../../styles/features/categories/ordered/alphabetically/AlphabeticalCategoriesComponent.css";
import { CategoryComponent } from "../../CategoryComponent";
import { CategoryItemComponent } from "../../CategoryItemComponent";
import { OrderingTypes } from "../../MainComponent";
import { useState } from "react";

interface IAlpheticalProps {
  categories: ICategory[];
}

function orderCategoriesAlphabetically(categories: ICategory[]) {
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
  const [selectedCategory, setSelectedCategory] = useState(-1);

  function changeSelectedCategory(id_category: number) {
    setSelectedCategory(id_category);
  }

  const categories: ICategory[] = orderCategoriesAlphabetically(
    props.categories
  );

  return (
    <ul className="alphabetical-categories-list">
      {categories.map((category) => (
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
