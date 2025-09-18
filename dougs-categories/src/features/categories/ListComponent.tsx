import React, { useEffect, useState } from "react";
import "../../styles/features/categories/ListComponent.css";
import {
  getAllCategories,
  getVisibleCategories,
} from "../../services/CategorieService";
import search from "../../assets/img/features/categories/search.png";
import { ICategory, IGroup } from "../../services/interfaces/Categorie";
import { AlphabeticalCategoriesComponent } from "./ordered/alphabetically/AlphabeticalCategoriesComponent";
import {
  GroupsCategoriesComponent,
  IGroupCategories,
} from "./ordered/group/GroupsCategoriesComponent";
import { OrderingTypes } from "./MainComponent";

interface IListProps {
  ordering: OrderingTypes;
}

async function getAllVisibleCategories(): Promise<ICategory[]> {
  let completeVisibleCategories: ICategory[] = [];
  try {
    const visibleCategories = await getVisibleCategories();
    const allCategories = await getAllCategories();

    completeVisibleCategories = allCategories.filter((category) =>
      visibleCategories.map((visible) => visible.id).includes(category.id)
    );
    return completeVisibleCategories;
  } catch (error) {
    console.error("Problème avec la récupération des catégories");
  }
  return completeVisibleCategories;
}

function orderCategoriesByGroups(categories: ICategory[]): IGroupCategories[] {
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

function orderCategoriesAlphabetically(categories: ICategory[]) {
  categories.sort(function (a, b) {
    return a.wording.localeCompare(b.wording);
  });

  return categories;
}

function ListComponent(props: IListProps) {
  const [allVisibleCategories, setAllVisibleCategories] = useState<ICategory[]>(
    []
  );

  const [filterGroupId, setFilterGroupId] = useState<number | undefined>();

  useEffect(() => {
    getAllVisibleCategories().then((value) => setAllVisibleCategories(value));
  }, []);

  function changeFilterGroupId(group_id: string) {
    if (group_id === "all") {
      setFilterGroupId(undefined);
    } else {
      setFilterGroupId(Number(group_id));
    }
  }

  const allCategoriesGrouped: IGroupCategories[] =
    orderCategoriesByGroups(allVisibleCategories);
  const categoriesInAlphabeticalOrder: ICategory[] =
    orderCategoriesAlphabetically(allVisibleCategories);

  return (
    <>
      <div className="list-categories-header">
        <div className="list-categories-search">
          <img
            className="list-categories-search-btn-img"
            src={search}
            alt="Loupe"
          />
          <input
            className="list-categories-search-input"
            type="text"
            placeholder="Rechercher une catégorie"
          />
        </div>
        <select
          className="list-categories-select"
          onChange={(event) => changeFilterGroupId(event.target.value)}
        >
          <option value="all">Tous les groupes de catégories</option>
          {allCategoriesGrouped.map((groupCategories) => (
            <option
              key={groupCategories.group.id}
              value={groupCategories.group.id}
              onClick={() =>
                changeFilterGroupId(groupCategories.group.id.toString())
              }
            >
              {groupCategories.group.name}
            </option>
          ))}
        </select>
      </div>
      {props.ordering === OrderingTypes.Alphabetical ? (
        <AlphabeticalCategoriesComponent
          categories={
            !!filterGroupId
              ? categoriesInAlphabeticalOrder.filter(
                  (category) => category.group?.id === filterGroupId
                )
              : categoriesInAlphabeticalOrder
          }
        />
      ) : (
        <GroupsCategoriesComponent
          groupsCategories={
            !!filterGroupId
              ? allCategoriesGrouped.filter(
                  (groupCategories: IGroupCategories) =>
                    groupCategories.group.id === filterGroupId
                )
              : allCategoriesGrouped
          }
        />
      )}
    </>
  );
}

export default ListComponent;
