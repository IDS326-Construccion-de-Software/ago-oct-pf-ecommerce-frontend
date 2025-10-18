import axios from "./axiosConfig";

class InvoiceClient {
  async getInvoicesByUser(userId) {
    try {
      const { data } = await axios.get(invoice/user/${userId});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async getInvoiceById(id) {
    try {
      const { data } = await axios.get(invoice/${id});
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async createInvoice(body) {
    try {
      const { data } = await axios.post("invoice", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async deleteInvoice(id) {
    try {
      await axios.delete(invoice/${id});
      return { success: true };
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { InvoiceClient };
