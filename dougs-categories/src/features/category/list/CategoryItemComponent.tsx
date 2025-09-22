import { ICategory } from "../../../services/api/interfaces/Categorie";
import "../../../styles/features/category/list/CategoryItemComponent.css";

interface ICategoryItemProps {
  category: ICategory;
  isSelected: boolean;
  selectCategory: Function;
  children?: React.ReactNode;
}

export function CategoryItemComponent(props: ICategoryItemProps) {
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
      {props.children}
    </li>
  );
}
