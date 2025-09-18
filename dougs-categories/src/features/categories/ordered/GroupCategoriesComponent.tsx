import { IGroupCategories } from "./GroupsCategoriesComponent";
import "../../../assets/features/categories/ordered/GroupCategoriesComponent.css";
import { GroupCategoryComponent } from "./GroupCategoryComponent";
import { useState } from "react";
interface IGroupCategoryProps {
  groupCategories: IGroupCategories;
}
export function GroupCategoriesComponent(props: IGroupCategoryProps) {
  const [selectedCategory, setSelectedCategorie] = useState(-1);

  function changeSelectedCategory(id_category: number) {
    setSelectedCategorie(id_category);
  }
  return (
    <li>
      <div className="group-categories-title">
        {props.groupCategories.group.name}
      </div>
      <ul className="group-categories-list">
        {props.groupCategories.categories.map((category) => (
          <GroupCategoryComponent
            key={category.id}
            category={category}
            isSelected={category.id === selectedCategory}
            selectCategory={changeSelectedCategory}
          ></GroupCategoryComponent>
        ))}
      </ul>
    </li>
  );
}
