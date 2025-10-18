import apiClient from "./axiosConfig"; 

export const ProductClient = {
  getAllProducts: (page = 1, limit = 20) => {
    return apiClient.get("/products", {
      params: { page, limit }
    });
  },

  getProductById: (id) => {
    return apiClient.get(`/products/${id}`);
  },

  getAllCategories: () => {
    return apiClient.get("/categories");
  },

  getAllBrands: () => {
    return apiClient.get("/brands");
  },
};
