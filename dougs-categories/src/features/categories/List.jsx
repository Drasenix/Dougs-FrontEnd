import React, { useEffect } from "react";
import "../../assets/features/categories/List.css";
import {
  getCategory,
  getVisibleCategories,
} from "../../services/CategorieService";
import search from "../../assets/features/categories/img/search.png";

function List() {
  useEffect(() => {
    getVisibleCategories();
    getCategory(1);
  }, []);

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
    </div>
  );
}

export default List;
