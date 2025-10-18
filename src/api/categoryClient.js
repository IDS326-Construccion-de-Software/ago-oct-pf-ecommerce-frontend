import axios from "./axiosConfig";

class CategoryClient {
  /**
   * Get all categories
   * @returns {Promise<Object>} Response with categories array
   */
  async getCategories() {
    try {
      const { data } = await axios.get("/category");
      return { success: true, data };
    } catch (error) {
      console.error("Error getting categories:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener categorías" },
      };
    }
  }

  /**
   * Get category by ID
   * @param {string} id - Category ID (GUID)
   * @returns {Promise<Object>} Response with category data
   */
  async getCategoryById(id) {
    try {
      const { data } = await axios.get(`/category/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting category ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener la categoría" },
      };
    }
  }

  /**
   * Create a new category
   * @param {Object} body - Category data
   * @returns {Promise<Object>} Response with created category
   */
  async createCategory(body) {
    try {
      const { data } = await axios.post("/category", body);
      return { success: true, data };
    } catch (error) {
      console.error("Error creating category:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al crear la categoría" },
      };
    }
  }

  /**
   * Update an existing category
   * @param {string} id - Category ID (GUID)
   * @param {Object} body - Updated category data
   * @returns {Promise<Object>} Response with success status
   */
  async updateCategory(id, body) {
    try {
      await axios.put(`/category/${id}`, body);
      return { success: true };
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al actualizar la categoría" },
      };
    }
  }

  /**
   * Delete a category
   * @param {string} id - Category ID (GUID)
   * @returns {Promise<Object>} Response with success status
   */
  async deleteCategory(id) {
    try {
      await axios.delete(`/category/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al eliminar la categoría" },
      };
    }
  }
}

export const categoryClient = new CategoryClient();
export { CategoryClient };
