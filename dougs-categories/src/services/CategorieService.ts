import api from "../lib/axios/AxiosFacade";
import { Categorie } from "./interfaces/Categorie";
import { VisibleCategorie } from "./interfaces/VisibleCategorie";

export async function getVisibleCategories(): Promise<VisibleCategorie[]> {
  try {
    const response = await api.get(`/visible-categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function getAllCategories(): Promise<Categorie[]> {
  try {
    const response = await api.get(`/all-categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}
