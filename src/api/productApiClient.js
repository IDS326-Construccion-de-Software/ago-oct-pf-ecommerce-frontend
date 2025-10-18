import axios from "./axiosConfig";

class ProductClient {
  async getAllProducts() {
    try {
      const { data } = await axios.get("product");
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getProductById(id) {
    try {
      const { data } = await axios.get(product/${id});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async createProduct(body) {
    try {
      const { data } = await axios.post("product", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async updateProduct(id, body) {
    try {
      await axios.put(product/${id}, body);
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteProduct(id) {
    try {
      await axios.delete(product/${id});
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { ProductClient };
