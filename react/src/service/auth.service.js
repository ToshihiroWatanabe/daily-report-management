import axios from "axios";

const API_URL = "http://localhost:8150/api/auth/";

const signup = (userId, password) => {
  return axios.post(API_URL + "signup", {
    userId,
    password,
  });
};

const login = (userId, password) => {
  return axios
    .post(API_URL + "login", {
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

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  signup,
  login,
  logout,
  getCurrentUser,
};
