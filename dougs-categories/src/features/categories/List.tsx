import React, { useState } from "react";
import "../../assets/features/categories/List.css";
import {
  getAllCategories,
  getVisibleCategories,
} from "../../services/CategorieService";
import search from "../../assets/features/categories/img/search.png";
import { Categorie } from "../../services/interfaces/Categorie";
import { Alphabetical } from "./ordered/Alphabetical";
import { Group } from "./ordered/Group";
import { OrderingTypes } from "./Main";

interface IListProps {
  ordering: OrderingTypes;
}

async function getCompleteVisibleCategories(): Promise<Categorie[]> {
  let completeVisibleCategories: Categorie[] = [];
  try {
    const visibleCategories = await getVisibleCategories();
    const allCategories = await getAllCategories();

    completeVisibleCategories = allCategories.filter((category) =>
      visibleCategories.map((visible) => visible.id).includes(category.id)
    );
  } catch (error) {
    console.error("Problème avec la récupération des caatégories");
  } finally {
    return completeVisibleCategories;
  }
}

function List(props: IListProps) {
  let categories: Categorie[] = [];
  getCompleteVisibleCategories().then((value) => (categories = value));
  const [completeVisibleCategories, setCompleteVisibleCategories] =
    useState(categories);

  return (
    <div className="list-categories">
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
        <Alphabetical categories={completeVisibleCategories}></Alphabetical>
      ) : (
        <Group categories={completeVisibleCategories}></Group>
      )}
    </div>
  );
}

export default List;
