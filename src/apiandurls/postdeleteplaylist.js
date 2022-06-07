import axios from "axios";
export async function postdeleteplaylist(params) {
  try {
    const { authtoken, playlistid } = params;
    const response = await axios.post(
      "https://videolibrari.herokuapp.com/playlist/delete",
      { playlistid },
      {
        headers: { authorization: authtoken },
      }
    );
    return { success: true, response: response.data };
  } catch (error) {
    return { success: false, error };
  }
}
