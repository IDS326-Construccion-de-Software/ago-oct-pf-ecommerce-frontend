import axios from "./axiosConfig";

class OrderClient {
  async getOrders() {
    try {
      const { data } = await axios.get("order");
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getOrderById(id) {
    try {
      const { data } = await axios.get(order/${id});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async createOrder(body) {
    try {
      const { data } = await axios.post("order", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async updateOrder(id, body) {
    try {
      await axios.put(order/${id}, body);
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteOrder(id) {
    try {
      await axios.delete(order/${id});
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { OrderClient };