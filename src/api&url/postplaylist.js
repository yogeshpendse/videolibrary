import axios from "axios";
export async function postplaylist(params) {
  try {
    const { authtoken, name, plid } = params;
    const response = await axios.post(
      "http://localhost:7000/playlist/create",
      { name, plid },
      {
        headers: { authorization: authtoken },
      }
    );
    return { success: true, response: response.data };
  } catch (error) {
    return { success: false, error };
  }
}
