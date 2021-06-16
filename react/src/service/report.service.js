import axios from "axios";

const API_URL = "http://localhost:8150/api/report/";

const sync = (userId, password, report) => {
  return axios.post(API_URL + "sync", { userId, password, report });
};

const update = (userId, password, report) => {
  return axios.post(API_URL + "update", { userId, password, report });
};

const findByReportId = (reportId) => {
  return axios.get(API_URL + "findbyreportid/" + reportId);
};

export default { sync, update, findByReportId };
