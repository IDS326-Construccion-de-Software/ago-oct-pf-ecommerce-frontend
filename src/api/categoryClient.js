import axios from "./axiosConfig";

class CategoryClient {
  async getCategories() {
    try {
      const { data } = await axios.get("category");
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getCategoryById(id) {
    try {
      const { data } = await axios.get(category/${id});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async createCategory(body) {
    try {
      const { data } = await axios.post("category", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async updateCategory(id, body) {
    try {
      await axios.put(category/${id}, body);
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteCategory(id) {
    try {
      await axios.delete(category/${id});
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { CategoryClient };
