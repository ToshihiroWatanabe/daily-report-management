import axios from "axios";

const API_URL = "http://localhost:8150/api/portfolio";

const findByReportId = (userId, password) => {
  return axios.post(API_URL + "/findbyreportid", { userId, password });
};

const update = (userId, password, userName, introduction, skillSet) => {
  return axios.post(API_URL + "/update", {
    userId,
    password,
    userName,
    introduction,
    skillSet,
  });
};

export default { findByReportId, update };
