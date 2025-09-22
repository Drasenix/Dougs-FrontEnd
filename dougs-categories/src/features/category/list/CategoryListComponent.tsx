import React, { useEffect, useState } from "react";
import "../../../styles/features/category/list/CategoryListComponent.css";
import {
  getAllCategories,
  getVisibleCategories,
} from "../../../services/CategorieService";
import search from "../../../assets/img/features/category/list/search.png";
import { ICategory, IGroup } from "../../../services/interfaces/Categorie";
import { AlphabeticalCategoriesComponent } from "./ordered/alphabetically/AlphabeticalCategoriesComponent";
import {
  GroupsCategoriesComponent,
  IGroupCategories,
} from "./ordered/group/GroupsCategoriesComponent";
import { OrderingTypes } from "../MainComponent";
import { IVisibleCategorie } from "../../../services/interfaces/VisibleCategorie";

interface IListProps {
  ordering: OrderingTypes;
}

async function getAllVisibleCategories(): Promise<ICategory[]> {
  let completeVisibleCategories: ICategory[] = [];
  try {
    const visibleCategories: IVisibleCategorie[] = await getVisibleCategories();
    const allCategories: ICategory[] = await getAllCategories();

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

function orderCategoriesAlphabetically(categories: ICategory[]): ICategory[] {
  categories.sort(function (a, b) {
    return a.wording.localeCompare(b.wording);
  });

  return categories;
}

function applyFilterOnCategories(
  filter: string,
  categories: ICategory[]
): ICategory[] {
  if (filter.length === 0) {
    return categories;
  }
  return categories.filter((category) => {
    return (
      category.wording
        ?.toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          filter
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) ||
      category.description
        ?.toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          filter
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    );
  });
}

function ListComponent(props: IListProps) {
  const [allVisibleCategories, setAllVisibleCategories] = useState<ICategory[]>(
    []
  );

  const [filterGroupId, setFilterGroupId] = useState<number | undefined>();
  const [filterCategories, setFilterCategories] = useState<string>("");

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

export default ListComponent;
