import axios from "./axiosConfig";

class ShoppingCartClient {
  /**
   * Get all shopping carts by user ID
   * @param {string} userId - User ID (GUID)
   * @returns {Promise<Object>} Response with carts array
   */
  async getCartsByUser(userId) {
    try {
      const { data } = await axios.get(`/cart/user/${userId}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting carts for user ${userId}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener los carritos" },
      };
    }
  }

  /**
   * Get shopping cart by ID
   * @param {string} id - Cart ID (GUID)
   * @returns {Promise<Object>} Response with cart data
   */
  async getCartById(id) {
    try {
      const { data } = await axios.get(`/cart/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting cart ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener el carrito" },
      };
    }
  }

  /**
   * Create a new shopping cart
   * @param {Object} body - Cart data with userId
   * @returns {Promise<Object>} Response with created cart
   */
  async createCart(body) {
    try {
      const { data } = await axios.post("/cart", body);
      return { success: true, data };
    } catch (error) {
      console.error("Error creating cart:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al crear el carrito" },
      };
    }
  }

  /**
   * Update an existing shopping cart
   * @param {string} id - Cart ID (GUID)
   * @param {Object} body - Updated cart data
   * @returns {Promise<Object>} Response with success status
   */
  async updateCart(id, body) {
    try {
      await axios.put(`/cart/${id}`, body);
      return { success: true };
    } catch (error) {
      console.error(`Error updating cart ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al actualizar el carrito" },
      };
    }
  }

  /**
   * Delete a shopping cart
   * @param {string} id - Cart ID (GUID)
   * @returns {Promise<Object>} Response with success status
   */
  async deleteCart(id) {
    try {
      await axios.delete(`/cart/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting cart ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al eliminar el carrito" },
      };
    }
  }
}

export const shoppingCartClient = new ShoppingCartClient();
export { ShoppingCartClient };
