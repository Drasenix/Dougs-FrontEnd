import { describe, expect, jest, test } from "@jest/globals";
import axios from "axios";
import * as categoryService from "../../../services/api/CategoryService";
import { IVisibleCategorie } from "../../../services/api/interfaces/VisibleCategorie";
import api from "../../../lib/axios/AxiosFacade";

jest.mock("axios");
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("tests getVisibleCategories", () => {
  test("should return values from get(/visible-categories)", async () => {
    // Given

    jest.mock("../../../lib/axios/AxiosFacade", () => {
      return {
        __esModule: true,
        default: mockedAxios,
      };
    });
    mockedAxios.get.mockResolvedValue(Promise.resolve({ data: { id: 1 } }));

    // When
    const result: IVisibleCategorie[] =
      await categoryService.getVisibleCategories();

    // Then
    expect(result).toEqual([{ id: 1 }]);
  });

  test("should log console error because error occuring on get(/visible-categories)", async () => {
    // Given
    // When
    // Then
  });
});

describe("tests getAllCategories", () => {
  test("should return values from get(/all-categories)", async () => {
    // Given
    // When
    // Then
  });

  test("should log console error because error occuring on get(/all-categories)", async () => {
    // Given
    // When
    // Then
  });
});
