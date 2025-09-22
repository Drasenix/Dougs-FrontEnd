import { IGroupCategories } from "./GroupsCategoriesComponent";
import "../../../../../styles/features/category/list/ordered/group/GroupCategoriesComponent.css";
import { useState } from "react";
import { OrderingTypes } from "../../../CategoryMenuComponent";
import { CategoryComponent } from "../../CategoryComponent";
import { CategoryItemComponent } from "../../CategoryItemComponent";
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

  const class_name_color = props.groupCategories.group.color;
  const class_name_even_or_odd: string =
    props.groupCategories.categories.length % 2 === 0
      ? "even-nb-categories"
      : "odd-nb-categories";
  return (
    <li className="group-categories-li">
      <div className={"group-categories-title " + class_name_color}>
        {props.groupCategories.group.name}
      </div>
      <ul className={"group-categories-list " + class_name_even_or_odd}>
        {props.groupCategories.categories.map((category) => (
          <CategoryItemComponent
            key={category.id}
            category={category}
            isSelected={
              category.id === selectedCategory && props.containsSelectedCategory
            }
            selectCategory={changeSelectedCategory}
          >
            <CategoryComponent
              ordering={OrderingTypes.Group}
              key={category.id}
              category={category}
            />
          </CategoryItemComponent>
        ))}
      </ul>
    </li>
  );
}
