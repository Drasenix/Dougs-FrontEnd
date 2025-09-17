import { ICategorie, IGroup } from "../../../services/interfaces/Categorie";

interface IGroupProps {
  categories: ICategorie[];
}

interface IGroupCategories {
  group: IGroup;
  categories: ICategorie[];
}

function orderCategoriesByGroups(categories: ICategorie[]): IGroupCategories[] {
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
    }
  });

  return Array.from(allGroupCategories, ([group, categories]) => ({
    group,
    categories,
  }));
}

export function GroupComponent(props: IGroupProps) {
  const groupCategories: IGroupCategories[] = orderCategoriesByGroups(
    props.categories
  );
  return <p>group</p>;
}
