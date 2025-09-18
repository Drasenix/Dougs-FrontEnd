import { IGroupCategories } from "./GroupsCategoriesComponent";
import "../../../../styles/features/categories/ordered/group/GroupCategoriesComponent.css";
import { useState } from "react";
import { CategoryComponent } from "../../CategoryComponent";
import { OrderingTypes } from "../../MainComponent";
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
          <CategoryComponent
            ordering={OrderingTypes.Group}
            key={category.id}
            category={category}
            isSelected={
              category.id === selectedCategory && props.containsSelectedCategory
            }
            selectCategory={changeSelectedCategory}
          ></CategoryComponent>
        ))}
      </ul>
    </li>
  );
}
