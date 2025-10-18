import axios from "./axiosConfig";

class ProductClient {
  /**
   * Get all products
   * @returns {Promise<Object>} Response with products array
   */
  async getAllProducts() {
    try {
      const { data } = await axios.get("/product");
      return { success: true, data };
    } catch (error) {
      console.error("Error getting products:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener productos" },
      };
    }
  }

  /**
   * Get product by ID
   * @param {string} id - Product ID (GUID)
   * @returns {Promise<Object>} Response with product data
   */
  async getProductById(id) {
    try {
      const { data } = await axios.get(`/product/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting product ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener el producto" },
      };
    }
  }

  /**
   * Create a new product
   * @param {Object} body - Product data
   * @returns {Promise<Object>} Response with created product
   */
  async createProduct(body) {
    try {
      const { data } = await axios.post("/product", body);
      return { success: true, data };
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al crear el producto" },
      };
    }
  }

  /**
   * Update an existing product
   * @param {string} id - Product ID (GUID)
   * @param {Object} body - Updated product data
   * @returns {Promise<Object>} Response with success status
   */
  async updateProduct(id, body) {
    try {
      await axios.put(`/product/${id}`, body);
      return { success: true };
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al actualizar el producto" },
      };
    }
  }

  /**
   * Delete a product
   * @param {string} id - Product ID (GUID)
   * @returns {Promise<Object>} Response with success status
   */
  async deleteProduct(id) {
    try {
      await axios.delete(`/product/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al eliminar el producto" },
      };
    }
  }
}

export const productClient = new ProductClient();
export { ProductClient };
