import api from "../lib/axios/AxiosFacade";

export const getVisibleCategories = async () => {
  try {
    const response = await api.get(`/visible-categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

export const getCategory = async (id: number) => {
  try {
    const response = await api.get(`/all-categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};
