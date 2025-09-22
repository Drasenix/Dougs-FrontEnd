import { ICategory } from "../../../../../api/interfaces/Categorie";

export function orderCategoriesAlphabetically(
  categories: ICategory[]
): ICategory[] {
  categories.sort(function (a, b) {
    return a.wording.localeCompare(b.wording);
  });

  return categories;
}
