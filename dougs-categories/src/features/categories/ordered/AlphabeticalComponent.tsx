import { ICategorie } from "../../../services/interfaces/Categorie";
import { CategorieComponent } from "../CategorieComponent";
import "../../../assets/features/categories/ordered/AlphabeticalComponent.css";

interface IAlpheticalProps {
  categories: ICategorie[];
}

function orderCategoriesAlphabetically(categories: ICategorie[]) {
  categories.sort(function (a, b) {
    if (a.wording < b.wording) {
      return -1;
    }
    if (a.wording > b.wording) {
      return 1;
    }
    return 0;
  });

  return categories;
}

export function AlphabeticalComponent(props: IAlpheticalProps) {
  const categories: ICategorie[] = orderCategoriesAlphabetically(
    props.categories
  );
  return (
    <ul className="categories-list">
      {categories.map((categorie) => (
        <li className="category-item">
          <div className="category-content">
            <div className="category-name-title">{categorie.group?.name}</div>
            <CategorieComponent
              wording={categorie.wording}
              description={categorie.description}
            ></CategorieComponent>
          </div>
        </li>
      ))}
    </ul>
  );
}
