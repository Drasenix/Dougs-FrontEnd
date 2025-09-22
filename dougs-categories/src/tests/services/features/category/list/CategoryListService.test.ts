import { ICategory } from "../../../../../services/api/interfaces/Categorie";
import { IVisibleCategorie } from "../../../../../services/api/interfaces/VisibleCategorie";
import {
  applyFilterOnCategories,
  getAllVisibleCategories,
} from "../../../../../services/features/category/list/CategoryListService";
import * as categoryService from "../../../../../services/api/CategoryService";
import { describe, expect, it, jest } from "@jest/globals";

describe("tests applyFilterOnCategories", () => {
  it("should filter categories and remove those not containing value in wording or description", () => {
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
      id: 2,
      group: {
        id: 1,
        name: "groupe 1",
        color: "m-blue",
      },
      wording: "wording test KO",
      description: "desc test OK",
    };

    const category_shoud_not_stay: ICategory = {
      id: 3,
      group: {
        id: 2,
        name: "groupe 2",
        color: "m-pink",
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

  it("should not filter at all", () => {
    // Given
    const category_shoud_stay_one: ICategory = {
      id: 1,
      group: {
        id: 1,
        name: "groupe 1",
        color: "m-blue",
      },
      wording: "wording test OK",
      description: "desc test KO",
    };

    const category_shoud_stay_second: ICategory = {
      id: 2,
      group: {
        id: 1,
        name: "groupe 1",
        color: "m-blue",
      },
      wording: "wording test KO",
      description: "desc test OK",
    };

    const category_shoud_stay_third: ICategory = {
      id: 3,
      group: {
        id: 2,
        name: "groupe 2",
        color: "m-pink",
      },
      wording: "wording test KO",
      description: "desc test KO",
    };

    // When
    const result: ICategory[] = applyFilterOnCategories("", [
      category_shoud_stay_one,
      category_shoud_stay_second,
      category_shoud_stay_third,
    ]);

    // THen
    expect(result).toEqual([
      category_shoud_stay_one,
      category_shoud_stay_second,
      category_shoud_stay_third,
    ]);
  });
});

describe("tests getAllVisibleCategories", () => {
  it("should return all categories because all categories are visible", async () => {
    // Given

    const category_first: ICategory = {
      id: 1,
      group: {
        id: 1,
        name: "groupe 1",
        color: "m-blue",
      },
      wording: "AAA",
      description: "desc",
    };

    const category_second: ICategory = {
      id: 2,
      group: {
        id: 1,
        name: "groupe 1",
        color: "m-blue",
      },
      wording: "BBB",
      description: "desc",
    };

    const category_third: ICategory = {
      id: 3,
      group: {
        id: 2,
        name: "groupe 2",
        color: "m-pink",
      },
      wording: "CCC",
      description: "desc",
    };

    const visibleCategories: IVisibleCategorie[] = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];
    const allCategories: ICategory[] = [
      category_first,
      category_second,
      category_third,
    ];

    jest
      .spyOn(categoryService, "getVisibleCategories")
      .mockImplementation(() => {
        return Promise.resolve(visibleCategories);
      });
    jest.spyOn(categoryService, "getAllCategories").mockImplementation(() => {
      return Promise.resolve(allCategories);
    });

    // When
    const result: ICategory[] = await getAllVisibleCategories();
    // Then
    expect(result).toEqual(allCategories);
  });

  it("should return only visible categories", async () => {
    // Given

    const category_first: ICategory = {
      id: 1,
      group: {
        id: 1,
        name: "groupe 1",
        color: "m-blue",
      },
      wording: "AAA",
      description: "desc",
    };

    const category_second: ICategory = {
      id: 2,
      group: {
        id: 1,
        name: "groupe 1",
        color: "m-blue",
      },
      wording: "BBB",
      description: "desc",
    };

    const category_third: ICategory = {
      id: 3,
      group: {
        id: 2,
        name: "groupe 2",
        color: "m-pink",
      },
      wording: "CCC",
      description: "desc",
    };

    const visibleCategories: IVisibleCategorie[] = [{ id: 1 }, { id: 2 }];
    const allCategories: ICategory[] = [
      category_first,
      category_second,
      category_third,
    ];

    jest
      .spyOn(categoryService, "getVisibleCategories")
      .mockImplementation(() => {
        return Promise.resolve(visibleCategories);
      });
    jest.spyOn(categoryService, "getAllCategories").mockImplementation(() => {
      return Promise.resolve(allCategories);
    });

    // When
    const result: ICategory[] = await getAllVisibleCategories();
    // Then
    expect(result).toEqual([category_first, category_second]);
  });

  it("should log console error because error calling getVisibleCategories", async () => {
    // Given
    console.error = jest.fn();

    jest
      .spyOn(categoryService, "getVisibleCategories")
      .mockImplementation(() => {
        return Promise.reject();
      });

    // When
    const result: ICategory[] = await getAllVisibleCategories();
    // Then
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "Problème avec la récupération des catégories"
    );
  });
});
