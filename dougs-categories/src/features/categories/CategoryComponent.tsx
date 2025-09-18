import { ICategory } from "../../services/interfaces/Categorie";
import "../../styles/features/categories/CategoryComponent.css";
import { OrderingTypes } from "./MainComponent";

interface ICategoryProps {
  category: ICategory;
  ordering: OrderingTypes;
}

export function CategoryComponent(props: ICategoryProps) {
  return (
    <div className={"category-content"}>
      {props.ordering === OrderingTypes.Alphabetical && (
        <div className="category-name-title">{props.category.group?.name}</div>
      )}
      <p className="categorie-wording">{props.category.wording}</p>
      <p className="categorie-description">{props.category.description}</p>
    </div>
  );
}
