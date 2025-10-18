import axios from "./axiosConfig";

class CartItemClient {
  async getAll() {
    try {
      const { data } = await axios.get("cart-items");
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getById(id) {
    try {
      const { data } = await axios.get(cart-items/${id});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getByCartId(cartId) {
    try {
      const { data } = await axios.get(cart-items/cart/${cartId});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async createCartItem(body) {
    try {
      const { data } = await axios.post("cart-items", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async updateCartItem(id, body) {
    try {
      await axios.put(cart-items/${id}, body);
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteCartItem(id) {
    try {
      await axios.delete(cart-items/${id});
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { CartItemClient };
