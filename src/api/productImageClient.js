import axios from "./axiosConfig";

class ProductImageClient {
  async getProductImages() {
    try {
      const { data } = await axios.get("productimage");
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getProductImageById(id) {
    try {
      const { data } = await axios.get(productimage/${id});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getPrimaryImage(productId) {
    try {
      const { data } = await axios.get(productimage/primary/${productId});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async createProductImage(body) {
    try {
      const { data } = await axios.post("productimage", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteProductImage(id) {
    try {
      await axios.delete(productimage/${id});
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { ProductImageClient };
