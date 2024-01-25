import AxiosInstance from "../shared/AxiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

class AuthService {
    private axiosInstance = AxiosInstance;

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance({ ...config });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'get', url });
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'post', url, data });
    }

    public async ValidateToken<T>(token: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'get', url: `auth/userTokenLogin?token=${token}` });
    }

    public async RequestBearer<T>(config?: AxiosRequestConfig): Promise<T> {
        const tokenString = sessionStorage.getItem("token");

        if (tokenString) {
            const { email, token } = JSON.parse(tokenString);
            const loginData = { email, sessionToken: token };

            const response = await this.request<T>({
                ...config,
                method: 'post',
                url: 'auth/Login',
                data: loginData
            });

            return response; // Assuming 'data' property exists on the response
        } else {
            throw new Error("Session token not found!");
        }
    }
}

export default AuthService;
