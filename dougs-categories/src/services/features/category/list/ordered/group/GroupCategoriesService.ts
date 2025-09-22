import { ICategory, IGroup } from "../../../../../api/interfaces/Categorie";
import { IGroupCategories } from "../../../../../../features/category/list/ordered/group/GroupsCategoriesComponent";

export function orderCategoriesByGroups(
  categories: ICategory[]
): IGroupCategories[] {
  const allGroupCategories = new Map();
  categories.forEach((categorie) => {
    if (categorie.group) {
      const group: IGroup = categorie.group;
      let groupCategories: IGroupCategories;

      if (allGroupCategories.get(group.id)) {
        groupCategories = allGroupCategories.get(group.id);
        groupCategories.categories.push(categorie);
      } else {
        groupCategories = {
          group,
          categories: [categorie],
        };
      }
      allGroupCategories.set(group.id, groupCategories);
    } else {
      console.log(
        "La catégorie id=" + categorie.id + " n'appartient à aucun groupe"
      );
    }
  });

  return Array.from(allGroupCategories, ([id, groupCategory]) => ({
    group: groupCategory.group,
    categories: groupCategory.categories,
  }));
}
