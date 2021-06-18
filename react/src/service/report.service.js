import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/report"
    : "http://localhost:8150/api/report";

const update = (userId, password, report) => {
  return axios.post(API_URL + "/update", { userId, password, report });
};

const findByReportId = (reportId) => {
  return axios.get(API_URL + "/findbyreportid/" + reportId);
};

export default { update, findByReportId };
