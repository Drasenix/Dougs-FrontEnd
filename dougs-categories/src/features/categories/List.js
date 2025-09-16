import React from "react";
import "../../assets/features/categories/List.css";
import alphabetical from "../../assets/features/categories/img/alphabetical-order.png";
import group from "../../assets/features/categories/img/group.png";
import ButtonCategory from "../../components/ui/ButtonCategory";

function List() {
  return (
    <>
      <header className="List-header">
        <p className="title-categories">Catégories</p>
        <ButtonCategory
          class="group-categories-btn"
          src={group}
          alt="Boutton qui permet de regrouper les catégories par groupes"
          text="Groupe de catégorie"
        ></ButtonCategory>
        <ButtonCategory
          class="alphabetical-order-categories-btn"
          src={alphabetical}
          alt="Boutton qui permet de trier les catégories par ordre alphabétique"
          text="Ordre alphabétique"
        ></ButtonCategory>
      </header>
      <footer className="List-footer">
        <button className="category-select-btn">
          <p className="category-select-btn-txt">Sélectionner la catégorie</p>
        </button>
      </footer>
    </>
  );
}

export default List;
