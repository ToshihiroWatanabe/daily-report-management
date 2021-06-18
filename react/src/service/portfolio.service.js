import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/portfolio"
    : "http://localhost:8150/api/portfolio";

const findByReportId = (reportId) => {
  return axios.get(API_URL + "/findbyreportid/" + reportId);
};

const findReportByReportId = (reportId) => {
  return axios.get(API_URL + "/findreportbyreportid/" + reportId);
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

export default { findByReportId, findReportByReportId, update };
