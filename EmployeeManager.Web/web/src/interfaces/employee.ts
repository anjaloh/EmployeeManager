import { Department } from './department';

export interface Employee {
  id: number;
  guid: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: string;
  age: number;
  salary: number;
  department: Department;
  createdAt: Date;
  updatedAt: Date;
}
