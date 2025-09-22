import { ICategory } from "../../../services/api/interfaces/Categorie";
import "../../../styles/features/category/list/CategoryComponent.css";
import { OrderingTypes } from "../CategoryMenuComponent";

interface ICategoryProps {
  category: ICategory;
  ordering: OrderingTypes;
}

export function CategoryComponent(props: ICategoryProps) {
  const class_name_color = props.category.group?.color;

  return (
    <div className={"category-content"}>
      {props.ordering === OrderingTypes.Alphabetical && (
        <div className={"category-name-title " + class_name_color}>
          {props.category.group?.name}
        </div>
      )}
      <p className="categorie-wording">{props.category.wording}</p>
      <p
        className="categorie-description"
        dangerouslySetInnerHTML={{ __html: props.category.description }}
      />
    </div>
  );
}
