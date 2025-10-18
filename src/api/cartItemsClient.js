import axios from "./axiosConfig";

class CartItemClient {
  async getAll() {
    try {
      const { data } = await axios.get("/cart-items");
      return { success: true, data };
    } catch (error) {
      console.error("Error getting cart items:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: {
          message: error.message || "Error al obtener items del carrito",
        },
      };
    }
  }

  async getById(id) {
    try {
      const { data } = await axios.get(`/cart-items/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting cart item ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: {
          message: error.message || "Error al obtener item del carrito",
        },
      };
    }
  }

  async getByCartId(cartId) {
    try {
      const { data } = await axios.get(`/cart-items/cart/${cartId}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting cart items for cart ${cartId}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: {
          message: error.message || "Error al obtener items del carrito",
        },
      };
    }
  }

  async createCartItem(body) {
    try {
      const { data } = await axios.post("/cart-items", body);
      return { success: true, data };
    } catch (error) {
      console.error("Error creating cart item:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al crear item del carrito" },
      };
    }
  }

  async updateCartItem(id, body) {
    try {
      await axios.put(`/cart-items/${id}`, body);
      return { success: true };
    } catch (error) {
      console.error(`Error updating cart item ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: {
          message: error.message || "Error al actualizar item del carrito",
        },
      };
    }
  }

  async deleteCartItem(id) {
    try {
      await axios.delete(`/cart-items/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting cart item ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: {
          message: error.message || "Error al eliminar item del carrito",
        },
      };
    }
  }
}

export const cartItemClient = new CartItemClient();
export { CartItemClient };
