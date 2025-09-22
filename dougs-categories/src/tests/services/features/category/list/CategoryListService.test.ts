import { ICategory } from "../../../../../services/api/interfaces/Categorie";
import { applyFilterOnCategories } from "../../../../../services/features/category/list/CategoryListService";
import { expect, test } from "@jest/globals";

test("should filter categories and remove those not containing value in wording or description", () => {
  // Given
  const category_shoud_stay_because_of_wording: ICategory = {
    id: 1,
    group: {
      id: 1,
      name: "groupe 1",
      color: "m-blue",
    },
    wording: "wording test OK",
    description: "desc test KO",
  };

  const category_shoud_stay_because_of_desc: ICategory = {
    id: 1,
    group: {
      id: 1,
      name: "groupe 1",
      color: "m-blue",
    },
    wording: "wording test KO",
    description: "desc test OK",
  };

  const category_shoud_not_stay: ICategory = {
    id: 1,
    group: {
      id: 1,
      name: "groupe 2",
      color: "m-blue",
    },
    wording: "wording test KO",
    description: "desc test KO",
  };

  // When
  const result_1: ICategory[] = applyFilterOnCategories("OK", [
    category_shoud_stay_because_of_wording,
    category_shoud_not_stay,
  ]);

  const result_2: ICategory[] = applyFilterOnCategories("OK", [
    category_shoud_stay_because_of_desc,
    category_shoud_not_stay,
  ]);

  // THen
  expect(result_1).toEqual([category_shoud_stay_because_of_wording]);
  expect(result_2).toEqual([category_shoud_stay_because_of_desc]);
});
