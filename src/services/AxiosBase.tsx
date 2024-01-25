import AxiosInstance from "../shared/AxiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosBase {
  private axiosInstance = AxiosInstance;

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      // Check if token is available in sessionStorage
      const token = sessionStorage.getItem("bearer");

      if (token) {
        // If token is available, add Authorization header
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response: AxiosResponse<T> = await this.axiosInstance({
        ...config,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AxiosBase;
