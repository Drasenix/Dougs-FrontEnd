import React, { useState } from "react";
import "../../styles/features/categories/MainComponent.css";
import ButtonCategoryComponent from "../../components/ui/ButtonCategoryComponent";
import ListComponent from "./ListComponent";

export enum OrderingTypes {
  Alphabetical = "alphabetical",
  Group = "group",
}
function MainComponent() {
  const [ordering, setOrdering] = useState(OrderingTypes.Group);

  function changeOrdering(ordering: OrderingTypes) {
    setOrdering(ordering);
  }
  return (
    <>
      <header className="Main-header">
        <p className="title-categories">Catégories</p>
        <ButtonCategoryComponent
          ordering={OrderingTypes.Group}
          isActive={ordering === OrderingTypes.Group}
          changeOrdering={changeOrdering}
        />
        <ButtonCategoryComponent
          ordering={OrderingTypes.Alphabetical}
          isActive={ordering === OrderingTypes.Alphabetical}
          changeOrdering={changeOrdering}
        />
      </header>

      <main className="Main-main">
        <ListComponent ordering={ordering} />
      </main>

      <footer className="Main-footer">
        <button className="category-select-btn">
          <p className="category-select-btn-txt">Sélectionner la catégorie</p>
        </button>
      </footer>
    </>
  );
}

export default MainComponent;
