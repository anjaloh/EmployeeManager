import { Employee } from '../interfaces/employee';

export type EmployeeFormProps = {
  formType: 'create' | 'update';
  employeeDetails?: Employee | undefined;
  isLoading?: boolean;
};
