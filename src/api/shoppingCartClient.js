import axios from "./axiosConfig";

class ShoppingCartClient {
  async getCartsByUser(userId) {
    try {
      const { data } = await axios.get(cart/user/${userId});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getCartById(id) {
    try {
      const { data } = await axios.get(cart/${id});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async createCart(body) {
    try {
      const { data } = await axios.post("cart", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async updateCart(id, body) {
    try {
      await axios.put(cart/${id}, body);
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteCart(id) {
    try {
      await axios.delete(cart/${id});
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { ShoppingCartClient };
