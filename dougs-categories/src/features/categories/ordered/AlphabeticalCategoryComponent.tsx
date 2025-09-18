import { CategorieComponent } from "../CategorieComponent";
import { ICategorie } from "../../../services/interfaces/Categorie";

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
      className={props.isSelected ? "category-item-selected" : "category-item"}
      onClick={() => handleSelectCategory()}
      onKeyDown={handleKeyDown}
    >
      <div className="category-content">
        <div className="category-name-title">{props.category.group?.name}</div>
        <CategorieComponent
          wording={props.category.wording}
          description={props.category.description}
        ></CategorieComponent>
      </div>
    </li>
  );
}
