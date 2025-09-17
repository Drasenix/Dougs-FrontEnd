import React, { useState } from "react";
import "../../assets/features/categories/Main.css";
import ButtonCategory from "../../components/ui/ButtonCategory";
import List from "./List";

export enum OrderingTypes {
  Alphabetical = "alphabetical",
  Group = "group",
}
function Main() {
  const [ordering, setOrdering] = useState(OrderingTypes.Group);

  function changeOrdering(ordering: OrderingTypes) {
    setOrdering(ordering);
  }
  return (
    <>
      <header className="Main-header">
        <p className="title-categories">Catégories</p>
        <ButtonCategory
          ordering={OrderingTypes.Group}
          isActive={ordering === OrderingTypes.Group}          
          changeOrdering={changeOrdering}
        ></ButtonCategory>
        <ButtonCategory
          ordering={OrderingTypes.Alphabetical}
          isActive={ordering === OrderingTypes.Alphabetical}
          changeOrdering={changeOrdering}
        ></ButtonCategory>
      </header>

      <main>
        <List ordering={ordering}></List>
      </main>

      <footer className="Main-footer">
        <button className="category-select-btn">
          <p className="category-select-btn-txt">Sélectionner la catégorie</p>
        </button>
      </footer>
    </>
  );
}

export default Main;
