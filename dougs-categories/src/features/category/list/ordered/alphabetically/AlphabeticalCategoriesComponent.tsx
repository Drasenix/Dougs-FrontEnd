import { ICategory } from "../../../../../services/api/interfaces/Categorie";
import "../../../../../styles/features/category/list/ordered/alphabetically/AlphabeticalCategoriesComponent.css";
import { useState } from "react";
import { OrderingTypes } from "../../../CategoryMenuComponent";
import { CategoryComponent } from "../../CategoryComponent";
import { CategoryItemComponent } from "../../CategoryItemComponent";

interface IAlpheticalProps {
  categories: ICategory[];
}

export function AlphabeticalCategoriesComponent(props: IAlpheticalProps) {
  const [selectedCategory, setSelectedCategory] = useState(-1);

  function changeSelectedCategory(id_category: number) {
    setSelectedCategory(id_category);
  }

  const class_name_even_or_odd: string =
    props.categories.length % 2 === 0
      ? "even-nb-categories"
      : "odd-nb-categories";

  return (
    <>
      <ul className={"alphabetical-categories-list " + class_name_even_or_odd}>
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
    </>
  );
}
