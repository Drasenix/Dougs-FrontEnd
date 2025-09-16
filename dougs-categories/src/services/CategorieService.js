import api from "../lib/axios/axiosFacade";

export const getVisibleCategories = async () => {
  try {
    const response = await api.get(`/visible-categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

export default getVisibleCategories;
