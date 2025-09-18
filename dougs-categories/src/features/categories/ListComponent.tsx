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

async function getCompleteVisibleCategories(): Promise<ICategory[]> {
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
  const [completeVisibleCategories, setCompleteVisibleCategories] = useState<
    ICategory[]
  >([]);

  useEffect(() => {
    getCompleteVisibleCategories().then((value) =>
      setCompleteVisibleCategories(value)
    );
  }, []);

  const categoriesGrouped: IGroupCategories[] = orderCategoriesByGroups(
    completeVisibleCategories
  );
  const categoriesInAlphabeticalOrder: ICategory[] =
    orderCategoriesAlphabetically(completeVisibleCategories);

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
        <select className="list-categories-select">
          <option value="all">Tous les groupes de catégories</option>
          {categoriesGrouped.map((groupCategories) => (
            <option value={groupCategories.group.id}>
              {groupCategories.group.name}
            </option>
          ))}
        </select>
      </div>
      {props.ordering === OrderingTypes.Alphabetical ? (
        <AlphabeticalCategoriesComponent
          categories={categoriesInAlphabeticalOrder}
        />
      ) : (
        <GroupsCategoriesComponent groupsCategories={categoriesGrouped} />
      )}
    </>
  );
}

export default ListComponent;
