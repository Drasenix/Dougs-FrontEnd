import { CategorieComponent } from "../../CategorieComponent";
import { ICategorie } from "../../../../services/interfaces/Categorie";
import "../../../../styles/features/categories/ordered/alphabetically/AlphabeticalCategoryComponent.css";

interface IAlphabeticalCategoryProps {
  category: ICategorie;
  isSelected: boolean;
  selectCategory: Function;
}

export function AlphabeticalCategoryComponent(
  props: IAlphabeticalCategoryProps
) {
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
          ? "alphabetical-category-item-selected"
          : "alphabetical-category-item"
      }
      onClick={() => handleSelectCategory()}
      onKeyDown={handleKeyDown}
    >
      <div className="alphabetical-category-content">
        <div className="alphabetical-category-name-title">
          {props.category.group?.name}
        </div>
        <CategorieComponent
          wording={props.category.wording}
          description={props.category.description}
        ></CategorieComponent>
      </div>
    </li>
  );
}
