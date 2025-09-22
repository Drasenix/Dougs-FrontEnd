import { ICategory } from "../../../../../../../services/api/interfaces/Categorie";
import { orderCategoriesAlphabetically } from "../../../../../../../services/features/category/list/ordered/alphabetically/AlphabeticalCategoriesService";
import { expect, it } from "@jest/globals";

it("should order category list alphabetically based on wording", () => {
  // Given
  const category_shoud_be_first: ICategory = {
    id: 1,
    group: {
      id: 1,
      name: "groupe 1",
      color: "m-blue",
    },
    wording: "AAA",
    description: "desc",
  };

  const category_shoud_be_second: ICategory = {
    id: 2,
    group: {
      id: 1,
      name: "groupe 1",
      color: "m-blue",
    },
    wording: "BBB",
    description: "desc",
  };

  const category_shoud_be_third: ICategory = {
    id: 3,
    group: {
      id: 1,
      name: "groupe 2",
      color: "m-pink",
    },
    wording: "CCC",
    description: "desc",
  };

  const categories: ICategory[] = [
    category_shoud_be_second,
    category_shoud_be_third,
    category_shoud_be_first,
  ];

  // When
  const result = orderCategoriesAlphabetically(categories);

  // Then
  const expected_ordered_list: ICategory[] = [
    category_shoud_be_first,
    category_shoud_be_second,
    category_shoud_be_third,
  ];
  expect(result).toEqual(expected_ordered_list);
});
