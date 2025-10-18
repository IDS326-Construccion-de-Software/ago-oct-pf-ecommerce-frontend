import axios from "./axiosConfig";

class ProductClientApiRaw {
  async getAllProducts() {
    try {
      const { data } = await axios.get("/product");
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getProductById(id) {
    try {
      const { data } = await axios.get(`/product/${id}`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async createProduct(body) {
    try {
      const { data } = await axios.post("/product", body);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async updateProduct(id, body) {
    try {
      const { data } = await axios.put(`/product/${id}`, body);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async deleteProduct(id) {
    try {
      await axios.delete(`/product/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export const productApiClient = new ProductClientApiRaw();
export { ProductClientApiRaw as ProductClient };
