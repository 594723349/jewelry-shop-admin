import axios from "axios";
import Qs from "qs";
import { message } from "ant-design-vue";
import Router from "../router";
import Store from "../store";
const service = axios.create({
  baseURL: "/admin/",
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    config.headers.token = Store.state.token;
    return config;
  },
  (error) => {
    message.error(error.message || "异常");
    console.error(JSON.stringify(error));
    return Promise.reject(new Error({ code: -1, message: error }));
  },
);

service.interceptors.response.use(
  (response) => {
    const code = response.data.code;
    if (code === 0) {
      return Promise.resolve(response.data.data);
    }
    message.error(response.data.msg);
    if (code === 10001 || code === 10002 || code === 10010) {
      Router.push({ path: "/" });
      Store.dispatch("clearUserInfo");
    }
    Store.commit("setLoading", false);
    return Promise.reject(new Error(response.data));
  },
  (error) => Promise.reject(new Error({ code: -1, message: error })),
);

const fetch = (method, url, headers, params) => {
  const key = method === "get" ? "params" : "data";
  const data =
    headers["Content-Type"] === "multipart/form-data" &&
    Object.prototype.toString.call(params) !== "[object FormData]"
      ? Qs.stringify(params)
      : params;
  return service({
    url,
    method,
    headers,
    [key]: data,
  });
};

// const processParams = (params) => params || {};
fetch.get = (url, config = {}) => (p) => fetch("get", url, config, p);
fetch.post = (url, config = {}) => (p) => fetch("post", url, config, p);
fetch.form = (url, config) => (p) => {
  console.log(typeof p, p);
  return fetch("post", url, { "Content-Type": "multipart/form-data", ...config }, p);
};

export default fetch;
