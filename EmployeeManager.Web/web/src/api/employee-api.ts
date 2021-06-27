import { ApiClient } from './api-client';
import { Employee } from '../interfaces/employee';
import { AxiosResponse } from 'axios';

export class EmployeeApi extends ApiClient {
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

  public GetAllEmployees = (): Promise<AxiosResponse<Employee[]>> =>
    this.instance.get<Employee[]>('/');

  public CreateEmployee = (
    employeeDetails: Employee
  ): Promise<AxiosResponse<Employee>> => this.instance.post<Employee>('/', employeeDetails);
}
