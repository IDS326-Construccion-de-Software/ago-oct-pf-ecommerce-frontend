import axios from "./axiosConfig";

class AuthenticationClient {
  /**
   * Register a new user
   * @param {Object} body - User registration data
   * @param {string} body.name - User's full name
   * @param {string} body.email - User's email
   * @param {string} body.password - User's password (min 8 characters)
   * @param {string} [body.cellphone] - User's phone number
   * @param {string} [body.birthdate] - User's birthdate (YYYY-MM-DD)
   * @param {number} [body.numIdentification] - User's ID number
   * @returns {Promise<Object>} Registration response with user data
   */
  async register(body) {
    try {
      const { data } = await axios.post("/auth/register", body);
      return { success: true, data };
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error desconocido al registrar" },
      };
    }
  }

  /**
   * Login user with email and password
   * @param {Object} body - Login credentials
   * @param {string} body.email - User's email
   * @param {string} body.password - User's password
   * @returns {Promise<Object>} Login response with tokens
   */
  async login(body) {
    try {
      const { data } = await axios.post("/auth/login", body);
      return { success: true, data };
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: {
          message: error.message || "Error desconocido al iniciar sesión",
        },
      };
    }
  }

  /**
   * Test Auth0 connection
   * @returns {Promise<Object>} Connection status
   */
  async testAuth0Connection() {
    try {
      const { data } = await axios.get("/auth/test-auth0");
      return { success: true, data };
    } catch (error) {
      console.error("Auth0 connection test error:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al conectar con Auth0" },
      };
    }
  }

  /**
   * Get profile by email (Id, Email)
   * @param {string} email
   */
  async getProfileByEmail(email) {
    try {
      const { data } = await axios.get(`/users/by-email`, {
        params: { email },
      });
      return { success: true, data };
    } catch (error) {
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return {
        success: false,
        error: { message: error.message || "Error al obtener perfil" },
      };
    }
  }
}

export const authClient = new AuthenticationClient();
export { AuthenticationClient };
