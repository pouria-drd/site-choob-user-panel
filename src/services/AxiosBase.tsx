import AxiosInstance from '../shared/AxiosInstance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosBase {
    private axiosInstance = AxiosInstance;
    protected contentType = 'application/json';
    protected responseType: 'blob' | undefined;
    protected bearerToken: string = '';
    protected async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            // Check if token is available in sessionStorage
            const token = sessionStorage.getItem('bearer');

            if (token) {
                this.bearerToken = token;
                // If token is available, add Authorization header
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                    'Content-Type': this.contentType,
                };
            }

            const response: AxiosResponse<T> = await this.axiosInstance({
                ...config,
                responseType: this.responseType,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default AxiosBase;
