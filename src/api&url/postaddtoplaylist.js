import axios from "axios";
export async function postaddtoplaylist(params) {
  try {
    const { authtoken, videouid, playlistid } = params;
    const response = await axios.post(
      "http://localhost:7000/playlist/addtoplaylist",
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
