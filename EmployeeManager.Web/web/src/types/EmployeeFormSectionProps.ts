import { Employee } from '../interfaces/employee';

export type EmployeeFormSectionProps = {
  formSubmittedHandler: (s: boolean) => void;
  selectedEmployee: Employee | undefined;
  setSelectedEmployee: (v: Employee | undefined) => void;
};
