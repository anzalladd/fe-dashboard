import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./config";

interface BaseServiceInterface {
  endPoint: string;
  useApi: string;
  token: string;
  http: AxiosInstance;
}

class BaseService implements BaseServiceInterface {
  endPoint: string;
  useApi: string;
  token: string;
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({});
    this.endPoint = "";
    this.useApi = "";
    this.token = window.localStorage.getItem("access_token") || "";
    this.setBaseUrl();
  }
  setBaseUrl() {
    this.http = axios.create({
      headers: {
        Accept: "application/json",
        'Access-Control-Allow-Origin': "*",
      },
      baseURL: BASE_URL,
    });
  }
  includeDefaultOptions(options: {}) {
    let accessToken = window.localStorage.getItem("token");
    this.setBaseUrl();
    if (accessToken !== null) {
      const defaultData = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return Object.assign(options, defaultData);
    }
    return options;
  }
  get(options = {}) {
    const opts = this.includeDefaultOptions(options);
    return this.http.get(this.endPoint, opts);
  }
  getNoAuth(options = {}, api = "") {
    this.useApi = api;
    this.setBaseUrl();
    const data = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const opts = Object.assign(options, data);
    return this.http.get(this.endPoint, opts);
  }
  post(payloads: any, options = {}) {
    const opts = this.includeDefaultOptions(options);
    return this.http.post(this.endPoint, payloads, opts);
  }
  patch(payloads: any, options = {}) {
    const opts = this.includeDefaultOptions(options);
    return this.http.patch(this.endPoint, payloads, opts);
  }

  put(payloads: any, options = {}) {
    const opts = this.includeDefaultOptions(options);
    return this.http.put(this.endPoint, payloads, opts);
  }

  delete(options = {}) {
    const opts = this.includeDefaultOptions(options);
    return this.http.delete(this.endPoint, opts);
  }
}

export default BaseService;
