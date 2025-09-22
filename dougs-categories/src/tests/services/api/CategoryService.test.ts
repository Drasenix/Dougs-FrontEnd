import { describe, expect, it, jest } from "@jest/globals";
import * as categoryService from "../../../services/api/CategoryService";
import { IVisibleCategorie } from "../../../services/api/interfaces/VisibleCategorie";
import { api } from "../../../lib/axios/AxiosFacade";
import { ICategory } from "../../../services/api/interfaces/Categorie";

describe("tests getVisibleCategories", () => {
  it("should return values from get(/visible-categories)", async () => {
    // Given

    jest
      .spyOn(api, "get")
      .mockResolvedValue(Promise.resolve({ data: [{ id: 1 }] }));

    // When
    const result: IVisibleCategorie[] =
      await categoryService.getVisibleCategories();

    // Then
    expect(result).toEqual([{ id: 1 }]);
  });

  it("should log console error and throw error because error occuring on get(/visible-categories)", async () => {
    // Given
    console.error = jest.fn();
    jest.spyOn(api, "get").mockResolvedValue(Promise.reject("invalid datas"));
    // When
    // Then

    await expect(categoryService.getVisibleCategories).rejects.toThrow(
      "Failed to fetch visible categories"
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching visible categories:",
      "invalid datas"
    );
  });
});

describe("tests getAllCategories", () => {
  it("should return values from get(/all-categories)", async () => {
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

    jest.spyOn(api, "get").mockResolvedValue(
      Promise.resolve({
        data: [
          category_shoud_stay_one,
          category_shoud_stay_second,
          category_shoud_stay_third,
        ],
      })
    );

    // When
    const result: ICategory[] = await categoryService.getAllCategories();

    // Then
    expect(result).toEqual([
      category_shoud_stay_one,
      category_shoud_stay_second,
      category_shoud_stay_third,
    ]);
  });

  it("should log console error and throw error because error occuring on get(/all-categories)", async () => {
    // Given
    console.error = jest.fn();
    jest.spyOn(api, "get").mockResolvedValue(Promise.reject("invalid datas"));
    // When
    // Then

    await expect(categoryService.getAllCategories).rejects.toThrow(
      "Failed to fetch all categories"
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching all categories:",
      "invalid datas"
    );
  });
});
