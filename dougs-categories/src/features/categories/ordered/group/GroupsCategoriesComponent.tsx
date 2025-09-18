import { ICategory, IGroup } from "../../../../services/interfaces/Categorie";
import "../../../../styles/features/categories/ordered/group/GroupsCategoriesComponent.css";
import { GroupCategoriesComponent } from "./GroupCategoriesComponent";
import { useState } from "react";
interface IGroupProps {
  groupsCategories: IGroupCategories[];
}

export interface IGroupCategories {
  group: IGroup;
  categories: ICategory[];
}

export function GroupsCategoriesComponent(props: IGroupProps) {
  const [groupHavingSelectedCategory, setGroupHavingSelectedCategory] =
    useState(-1);

  function changeGroupHavingSelectedCategory(id_group: number) {
    setGroupHavingSelectedCategory(id_group);
  }

  return (
    <ul className="groups-categories-list">
      {props.groupsCategories.map((groupCategories) => (
        <GroupCategoriesComponent
          key={groupCategories.group.id}
          groupCategories={groupCategories}
          changeGroupContainingSelectedCategory={
            changeGroupHavingSelectedCategory
          }
          containsSelectedCategory={
            groupHavingSelectedCategory === groupCategories.group.id
          }
        />
      ))}
    </ul>
  );
}
