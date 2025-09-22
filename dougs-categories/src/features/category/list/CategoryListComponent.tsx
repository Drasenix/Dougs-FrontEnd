import React, { useEffect, useState } from "react";
import "../../../styles/features/category/list/CategoryListComponent.css";
import search from "../../../assets/img/features/category/list/search.png";
import { ICategory } from "../../../services/api/interfaces/Categorie";
import { AlphabeticalCategoriesComponent } from "./ordered/alphabetically/AlphabeticalCategoriesComponent";
import {
  GroupsCategoriesComponent,
  IGroupCategories,
} from "./ordered/group/GroupsCategoriesComponent";
import { OrderingTypes } from "../CategoryMenuComponent";
import { orderCategoriesAlphabetically } from "../../../services/features/category/list/ordered/alphabetically/AlphabeticalCategoriesService";
import { orderCategoriesByGroups } from "../../../services/features/category/list/ordered/group/GroupCategoriesService";
import {
  getAllVisibleCategories,
  applyFilterOnCategories,
} from "../../../services/features/category/list/CategoryListService";

interface IListProps {
  ordering: OrderingTypes;
}

function CategoryListComponent(props: IListProps) {
  const [allVisibleCategories, setAllVisibleCategories] = useState<ICategory[]>(
    []
  );

  const [filterGroupId, setFilterGroupId] = useState<number | undefined>();
  const [filterCategories, setFilterCategories] = useState<string>("");

  useEffect(() => {
    async function prepareAllVisibleCategories() {
      const allVisibleCategories: ICategory[] = await getAllVisibleCategories();
      setAllVisibleCategories(allVisibleCategories);
    }

    prepareAllVisibleCategories().catch((error) => console.error(error));
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

  const filteredVisibleCategories: ICategory[] = applyFilterOnCategories(
    filterCategories,
    allVisibleCategories
  );

  const filteredCategoriesGrouped: IGroupCategories[] = orderCategoriesByGroups(
    filteredVisibleCategories
  );
  const filteredCategoriesInAlphabeticalOrder: ICategory[] =
    orderCategoriesAlphabetically(filteredVisibleCategories);

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
            role="search"
            value={filterCategories}
            onInput={(e) => setFilterCategories(e.currentTarget.value)}
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
              ? filteredCategoriesInAlphabeticalOrder.filter(
                  (category) => category.group?.id === filterGroupId
                )
              : filteredCategoriesInAlphabeticalOrder
          }
        />
      ) : (
        <GroupsCategoriesComponent
          groupsCategories={
            !!filterGroupId
              ? filteredCategoriesGrouped.filter(
                  (groupCategories: IGroupCategories) =>
                    groupCategories.group.id === filterGroupId
                )
              : filteredCategoriesGrouped
          }
        />
      )}
    </>
  );
}

export default CategoryListComponent;
