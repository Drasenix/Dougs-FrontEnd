import { ICategorie } from "../../services/interfaces/Categorie";
import "../../styles/features/categories/CategoryComponent.css";
import { OrderingTypes } from "./MainComponent";

interface ICategorieProps {
  category: ICategorie;
  ordering: OrderingTypes;
  isSelected: boolean;
  selectCategory: Function;
}

export function CategoryComponent(props: ICategorieProps) {
  function handleSelectCategory() {
    props.selectCategory(props.category.id);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSelectCategory();
    }
  };

  return (
    <li
      tabIndex={0}
      className={props.isSelected ? "category-item-selected" : "category-item"}
      onClick={() => handleSelectCategory()}
      onKeyDown={handleKeyDown}
    >
      <div className={"category-content"}>
        {props.ordering === OrderingTypes.Alphabetical && (
          <div className="category-name-title">
            {props.category.group?.name}
          </div>
        )}
        <p className="categorie-wording">{props.category.wording}</p>
        <p className="categorie-description">{props.category.description}</p>
      </div>
    </li>
  );
}
