import axios from "./axiosConfig";

class AuthenticationClient {
  async register(body) {
    try {
      const { data } = await axios.post("auth/register", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async login(body) {
    try {
      const { data } = await axios.post("auth/login", body);
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }

  async testAuth0Connection() {
    try {
      const { data } = await axios.get("auth/test-auth0");
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : "Unknown error";
    }
  }
}

export { AuthenticationClient };
