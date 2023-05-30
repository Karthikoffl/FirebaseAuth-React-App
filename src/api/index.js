import axios from "axios";

const baseURL = "http://127.0.0.1:5001/fir-auth-c0d5a/us-central1/app";

export const validateGoogleToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/loginvalidate`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
