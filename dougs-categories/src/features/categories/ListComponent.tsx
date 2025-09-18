import React, { useEffect, useState } from "react";
import "../../assets/features/categories/ListComponent.css";
import {
  getAllCategories,
  getVisibleCategories,
} from "../../services/CategorieService";
import search from "../../assets/features/categories/img/search.png";
import { ICategorie } from "../../services/interfaces/Categorie";
import { AlphabeticalCategoriesComponent } from "./ordered/AlphabeticalCategoriesComponent";
import { GroupsCategoriesComponent } from "./ordered/GroupsCategoriesComponent";
import { OrderingTypes } from "./MainComponent";

interface IListProps {
  ordering: OrderingTypes;
}

async function getCompleteVisibleCategories(): Promise<ICategorie[]> {
  let completeVisibleCategories: ICategorie[] = [];
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

function ListComponent(props: IListProps) {
  const [completeVisibleCategories, setCompleteVisibleCategories] = useState<
    ICategorie[]
  >([]);

  useEffect(() => {
    getCompleteVisibleCategories().then((value) =>
      setCompleteVisibleCategories(value)
    );
  }, []);

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
          <option value="one">Groupe 1</option>
          <option value="two">Groupe 2</option>
          <option value="three">Groupe 3</option>
        </select>
      </div>
      {props.ordering === OrderingTypes.Alphabetical ? (
        <AlphabeticalCategoriesComponent
          categories={completeVisibleCategories}
        ></AlphabeticalCategoriesComponent>
      ) : (
        <GroupsCategoriesComponent
          categories={completeVisibleCategories}
        ></GroupsCategoriesComponent>
      )}
    </>
  );
}

export default ListComponent;
