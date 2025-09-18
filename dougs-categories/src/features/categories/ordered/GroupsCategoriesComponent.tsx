import { ICategorie, IGroup } from "../../../services/interfaces/Categorie";
import "../../../assets/features/categories/ordered/GroupsCategoriesComponent.css";
import { GroupCategoriesComponent } from "./GroupCategoriesComponent";
import { useState } from "react";
interface IGroupProps {
  categories: ICategorie[];
}

export interface IGroupCategories {
  group: IGroup;
  categories: ICategorie[];
}

function orderCategoriesByGroups(categories: ICategorie[]): IGroupCategories[] {
  const allGroupCategories = new Map();
  categories.forEach((categorie) => {
    if (categorie.group) {
      const group: IGroup = categorie.group;
      let groupCategories: IGroupCategories;
      if (allGroupCategories.get(group.id)) {
        groupCategories = allGroupCategories.get(group.id);
        groupCategories.categories.push(categorie);
      } else {
        groupCategories = {
          group,
          categories: [categorie],
        };
      }
      allGroupCategories.set(group.id, groupCategories);
    }
  });

  return Array.from(allGroupCategories, ([id, groupCategory]) => ({
    group: groupCategory.group,
    categories: groupCategory.categories,
  }));
}

export function GroupsCategoriesComponent(props: IGroupProps) {
  const [groupHavingSelectedCategory, setGroupHavingSelectedCategory] =
    useState(-1);

  function changeGroupHavingSelectedCategory(id_group: number) {
    setGroupHavingSelectedCategory(id_group);
  }
  const groupsCategories: IGroupCategories[] = orderCategoriesByGroups(
    props.categories
  );
  return (
    <ul className="groups-categories-list">
      {groupsCategories.map((groupCategories) => (
        <GroupCategoriesComponent
          key={groupCategories.group.id}
          groupCategories={groupCategories}
          changeGroupContainingSelectedCategory={
            changeGroupHavingSelectedCategory
          }
          containsSelectedCategory={
            groupHavingSelectedCategory === groupCategories.group.id
          }
        ></GroupCategoriesComponent>
      ))}
    </ul>
  );
}
