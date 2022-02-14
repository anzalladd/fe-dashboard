import BaseService from "./BaseService";

class CommonServices extends BaseService {
  login(payload: any) {
    this.endPoint = "/api/v1/login";
    return this.post(payload, {});
  }

  getMe() {
    this.endPoint = "/api/v1/get-me";
    return this.get({});
  }

  getStock(opts = {}) {
    this.endPoint = '/api/v1/stock'
    return this.get(opts)
  }
}

export default new CommonServices();
