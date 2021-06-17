import axios from "axios";

const API_URL = "http://localhost:8150/api/setting";

const findByUserId = (userId, password) => {
  return axios.post(API_URL + "/findbyuserid", { userId, password });
};

const update = (userId, password, slackSetting) => {
  return axios.post(API_URL + "/update", {
    userId,
    password,
    slackSetting,
  });
};

export default { findByUserId, update };
