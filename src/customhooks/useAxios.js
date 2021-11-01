import { useState, useEffect } from "react";
import axios from "axios";
export const useAxios = (params) => {
  const { url, token } = params;
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          headers: { authorization: token },
        });
        setResponse(res.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, token]);

  return { response, error, loading };
};
