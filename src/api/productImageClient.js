import axios from "./axiosConfig";

class ProductImageClient {
  async getProductImages() {
    try {
      const { data } = await axios.get("/productimage");
      return { success: true, data };
    } catch (error) {
      console.error("Error getting product images:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener imágenes" },
      };
    }
  }

  async getProductImageById(id) {
    try {
      const { data } = await axios.get(`/productimage/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting product image ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener imagen" },
      };
    }
  }

  async getPrimaryImage(productId) {
    try {
      const { data } = await axios.get(`/productimage/primary/${productId}`);
      return { success: true, data };
    } catch (error) {
      console.error(
        `Error getting primary image for product ${productId}:`,
        error
      );
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: {
          message: error.message || "Error al obtener imagen principal",
        },
      };
    }
  }

  async createProductImage(body) {
    try {
      const { data } = await axios.post("/productimage", body);
      return { success: true, data };
    } catch (error) {
      console.error("Error creating product image:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al crear imagen" },
      };
    }
  }

  async deleteProductImage(id) {
    try {
      await axios.delete(`/productimage/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting product image ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al eliminar imagen" },
      };
    }
  }
}

export const productImageClient = new ProductImageClient();
export { ProductImageClient };
