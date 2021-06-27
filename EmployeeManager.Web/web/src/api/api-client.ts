import axios, { AxiosInstance } from 'axios';

export abstract class ApiClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    // this._initialResponseInterceptor();
  }

  // private _handleResponse = ({ data }: AxiosResponse) => data;
  //
  // protected _handleError = (error: any) => Promise.reject(error);
  //
  // private _initialResponseInterceptor = () => {
  //   this.instance.interceptors.response.use(
  //     this._handleResponse,
  //     this._handleError
  //   );
  // };
}
