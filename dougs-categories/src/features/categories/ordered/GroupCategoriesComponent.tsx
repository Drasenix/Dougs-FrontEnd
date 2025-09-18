import { IGroupCategories } from "./GroupsCategoriesComponent";
import "../../../assets/features/categories/ordered/GroupCategoriesComponent.css";
import { GroupCategoryComponent } from "./GroupCategoryComponent";
import { useState } from "react";
interface IGroupCategoryProps {
  groupCategories: IGroupCategories;
  changeGroupContainingSelectedCategory: Function;
  containsSelectedCategory: boolean;
}
export function GroupCategoriesComponent(props: IGroupCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState(-1);

  function changeSelectedCategory(id_category: number) {
    setSelectedCategory(id_category);
    props.changeGroupContainingSelectedCategory(props.groupCategories.group.id);
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
            isSelected={
              category.id === selectedCategory && props.containsSelectedCategory
            }
            selectCategory={changeSelectedCategory}
          ></GroupCategoryComponent>
        ))}
      </ul>
    </li>
  );
}
