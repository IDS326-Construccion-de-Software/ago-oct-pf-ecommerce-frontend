import axios from "axios";

const API = import.meta.env.VITE_CONTACT_API || "";

export async function sendContact(payload) {
  if (!API) {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, simulated: true };
  }
  const res = await axios.post(API, payload);
  return { success: true, data: res.data };
}
