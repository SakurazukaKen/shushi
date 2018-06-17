import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IYituResponse } from "../models/YituResponse";
declare type ResponseHandler<T> = (res: AxiosResponse<T>) => T | PromiseLike<T>;
class APIService {
  handleSuccess<T = any>(response: AxiosResponse<T>) {
    const res = response.data;
    return res;
  }

  handleError(error: AxiosError) {
    // throw error;
    return {rtn: -1} as IYituResponse;
  }

  get<T extends IYituResponse = IYituResponse>(url: string, data?: object) {
    return axios
      .get<T>(url, {
        params: data || {}
      })
      .then(this.handleSuccess as ResponseHandler<T>, this.handleError);
  }

  post<T extends IYituResponse = IYituResponse>(
    url: string,
    data?: any,
    optionsParam?: AxiosRequestConfig
  ) {
    const options = optionsParam || {};
    if (options.headers) {
      options.headers = {
        "Content-Type": "application/json;charset=utf-8"
      };
    }
    return axios
      .post<T>(url, data, options)
      .then(this.handleSuccess as ResponseHandler<T>, this.handleError);
  }

  put<T extends IYituResponse = IYituResponse>(url: string, data?: any) {
    return axios.put<T>(url, data).then(this.handleSuccess as ResponseHandler<T>, this.handleError);
  }

  delete<T extends IYituResponse = IYituResponse>(url: string, data?: object) {
    return axios
      .request({
        url,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        method: "DELETE",
        params: data || {},
      })
      .then(this.handleSuccess as ResponseHandler<T>, this.handleError);
  }
}
export default new APIService();
