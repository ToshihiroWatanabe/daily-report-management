import axios from "axios";

const API_URL = "http://localhost:8150/api/report/";

const sync = (userId, password, report) => {
  return axios.post(API_URL + "sync", { userId, password, report });
};

export default { sync };
