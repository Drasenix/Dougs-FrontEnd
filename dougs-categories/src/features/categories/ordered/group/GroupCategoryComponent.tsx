import { ICategorie } from "../../../../services/interfaces/Categorie";
import { CategorieComponent } from "../../CategorieComponent";
import "../../../../styles/features/categories/ordered/group/GroupCategoryComponent.css";

interface IGroupCategoryProps {
  category: ICategorie;
  isSelected: boolean;
  selectCategory: Function;
}

export function GroupCategoryComponent(props: IGroupCategoryProps) {
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
      className={
        props.isSelected
          ? "group-category-item-selected"
          : "group-category-item"
      }
      onClick={() => handleSelectCategory()}
      onKeyDown={handleKeyDown}
    >
      <div className="group-category-content">
        <CategorieComponent
          wording={props.category.wording}
          description={props.category.description}
        ></CategorieComponent>
      </div>
    </li>
  );
}
