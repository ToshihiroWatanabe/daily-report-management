import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/auth"
    : "http://localhost:8150/api/auth";

const signup = (userId, password) => {
  return axios.post(API_URL + "/signup", {
    userId,
    password,
  });
};

const login = (userId, password) => {
  return axios
    .post(API_URL + "/login", {
      userId,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export default {
  signup,
  login,
};
