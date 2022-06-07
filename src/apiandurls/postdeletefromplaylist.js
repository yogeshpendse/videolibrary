import axios from "axios";
export async function postdeletefromplaylist(params) {
  try {
    const { authtoken, videouid, playlistid } = params;
    const response = await axios.post(
      "https://videolibrari.herokuapp.com/playlist/deletefromplaylist",
      { videouid, playlistid },
      {
        headers: { authorization: authtoken },
      }
    );
    return { success: true, response: response.data };
  } catch (error) {
    return { success: false, errorresponse: error.response.data };
  }
}
