import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export abstract class ApiClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initialResponseInterceptor();
  }

  private _handleResponse = (response: AxiosResponse) => response;

  private _handleError = (error: AxiosError) => {
    if (!error.response) {
      console.error('Check your connectivity to the backend service.');
    }
    return Promise.reject(error);
  };

  private _initialResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };
}
