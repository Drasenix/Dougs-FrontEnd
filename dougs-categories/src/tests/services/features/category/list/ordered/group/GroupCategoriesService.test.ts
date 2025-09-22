import { IGroupCategories } from "../../../../../../../features/category/list/ordered/group/GroupsCategoriesComponent";
import { ICategory } from "../../../../../../../services/api/interfaces/Categorie";
import { orderCategoriesByGroups } from "../../../../../../../services/features/category/list/ordered/group/GroupCategoriesService";
import { expect, it, jest } from "@jest/globals";

it("should return an array of groups with their categories based on category's group id", () => {
  // Given
  const first_category_in_group_one: ICategory = {
    id: 1,
    group: {
      id: 1,
      name: "groupe 1",
      color: "m-blue",
    },
    wording: "AAA",
    description: "desc",
  };

  const second_category_in_group_one: ICategory = {
    id: 2,
    group: {
      id: 1,
      name: "groupe 1",
      color: "m-blue",
    },
    wording: "AAAA",
    description: "desc",
  };

  const category_in_group_two: ICategory = {
    id: 3,
    group: {
      id: 2,
      name: "groupe 2",
      color: "m-pink",
    },
    wording: "BBB",
    description: "desc",
  };

  const categories: ICategory[] = [
    first_category_in_group_one,
    second_category_in_group_one,
    category_in_group_two,
  ];

  // When
  const result: IGroupCategories[] = orderCategoriesByGroups(categories);

  // Then
  const group_categories_one: IGroupCategories = {
    group: {
      id: 1,
      color: "m-blue",
      name: "groupe 1",
    },
    categories: [first_category_in_group_one, second_category_in_group_one],
  };

  const group_categories_two: IGroupCategories = {
    group: {
      id: 2,
      color: "m-pink",
      name: "groupe 2",
    },
    categories: [category_in_group_two],
  };

  const expected_result: IGroupCategories[] = [
    group_categories_one,
    group_categories_two,
  ];
  expect(result).toEqual(expected_result);
});

it("should be alerted that a category is not in a group", () => {
  // Given
  console.log = jest.fn();
  const category_not_in_group: ICategory = {
    id: 3,
    wording: "BBB",
    description: "desc",
  };

  // When
  orderCategoriesByGroups([category_not_in_group]);

  // Then
  expect(console.log).toHaveBeenCalledWith(
    "La catégorie id=3 n'appartient à aucun groupe"
  );
});
