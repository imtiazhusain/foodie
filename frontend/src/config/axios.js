import { default as axios_lib } from "axios";

const axios = axios_lib.create({
  baseURL: "http://localhost:2100/api",
});

export default axios;
