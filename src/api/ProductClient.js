import apiClient from "./axiosConfig"; 

export const ProductClient = {
  getAllProducts: async (page = 1, limit = 20) => {
    try {
      return await apiClient.get("/products", {
        params: { page, limit }
      });
    } catch (error) {
      // Puedes personalizar el manejo de errores aquí
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      return await apiClient.get(`/products/${id}`);
    } catch (error) {
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      return await apiClient.get("/categories");
    } catch (error) {
      throw error;
    }
  },

  getAllBrands: async () => {
    try {
      return await apiClient.get("/brands");
    } catch (error) {
      throw error;
    }
  },
};
