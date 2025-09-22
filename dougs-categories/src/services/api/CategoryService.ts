import { api } from "../../lib/axios/AxiosFacade";
import { ICategory } from "./interfaces/Categorie";
import { IVisibleCategorie } from "./interfaces/VisibleCategorie";

export async function getVisibleCategories(): Promise<IVisibleCategorie[]> {
  try {
    const response = await api.get(`/visible-categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching visible categories:", error);
    throw new Error("Failed to fetch visible categories");
  }
}

export async function getAllCategories(): Promise<ICategory[]> {
  try {
    const response = await api.get(`/all-categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw new Error("Failed to fetch all categories");
  }
}
