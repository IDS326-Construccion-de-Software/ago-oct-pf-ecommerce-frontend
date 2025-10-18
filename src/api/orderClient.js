import axios from "./axiosConfig";

class OrderClient {
  /**
   * Get all orders
   * @returns {Promise<Object>} Response with orders array
   */
  async getOrders() {
    try {
      const { data } = await axios.get("/order");
      return { success: true, data };
    } catch (error) {
      console.error("Error getting orders:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener órdenes" },
      };
    }
  }

  /**
   * Get order by ID
   * @param {string} id - Order ID (GUID)
   * @returns {Promise<Object>} Response with order data
   */
  async getOrderById(id) {
    try {
      const { data } = await axios.get(`/order/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting order ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener la orden" },
      };
    }
  }

  /**
   * Create a new order
   * @param {Object} body - Order data
   * @returns {Promise<Object>} Response with created order
   */
  async createOrder(body) {
    try {
      const { data } = await axios.post("/order", body);
      return { success: true, data };
    } catch (error) {
      console.error("Error creating order:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al crear la orden" },
      };
    }
  }

  /**
   * Update an existing order
   * @param {string} id - Order ID (GUID)
   * @param {Object} body - Updated order data
   * @returns {Promise<Object>} Response with success status
   */
  async updateOrder(id, body) {
    try {
      await axios.put(`/order/${id}`, body);
      return { success: true };
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al actualizar la orden" },
      };
    }
  }

  /**
   * Delete an order
   * @param {string} id - Order ID (GUID)
   * @returns {Promise<Object>} Response with success status
   */
  async deleteOrder(id) {
    try {
      await axios.delete(`/order/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al eliminar la orden" },
      };
    }
  }
}

export const orderClient = new OrderClient();
export { OrderClient };
