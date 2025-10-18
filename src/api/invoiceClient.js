import axios from "./axiosConfig";

class InvoiceClient {
  async getInvoicesByUser(userId) {
    try {
      const { data } = await axios.get(`/invoice/user/${userId}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting invoices for user ${userId}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener facturas" },
      };
    }
  }

  async getInvoiceById(id) {
    try {
      const { data } = await axios.get(`/invoice/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error getting invoice ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener factura" },
      };
    }
  }

  async createInvoice(body) {
    try {
      const { data } = await axios.post("/invoice", body);
      return { success: true, data };
    } catch (error) {
      console.error("Error creating invoice:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al crear factura" },
      };
    }
  }

  async deleteInvoice(id) {
    try {
      await axios.delete(`/invoice/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting invoice ${id}:`, error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al eliminar factura" },
      };
    }
  }
}

export const invoiceClient = new InvoiceClient();
export { InvoiceClient };
