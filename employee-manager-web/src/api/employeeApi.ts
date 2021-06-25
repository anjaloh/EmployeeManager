import { HttpClient } from './httpClient';
import { Employee } from '../types/employee';

export class EmployeeApi extends HttpClient {
  private static classInstance: EmployeeApi;

  private constructor() {
    super('https://localhost:5001/api/v1/employees');
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new EmployeeApi();
    }

    return this.classInstance;
  }

  public GetEmployees = () => this.instance.get<Employee>('/');
}
