import axios from "axios";

const API = import.meta.env.VITE_NEWSLETTER_API || "";

export async function subscribeNewsletter(email) {
  if (!API) {
    // If no API configured, simulate success
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, simulated: true };
  }
  const res = await axios.post(API, { email });
  return { success: true, data: res.data };
}
