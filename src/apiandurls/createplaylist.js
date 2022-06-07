import axios from "axios";
export async function createplaylist(params) {
  try {
    const { authtoken, name, plid } = params;
    const response = await axios.post(
      "https://videolibrari.herokuapp.com/playlist/create",
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
