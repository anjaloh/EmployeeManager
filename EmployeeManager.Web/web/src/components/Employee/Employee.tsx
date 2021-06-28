import { useParams } from 'react-router-dom';
import { EmployeeForm } from './common/EmployeeForm';
import { useEffect, useState } from 'react';
import { EmployeeApi } from '../../api/employee-api';
import { Employee as IEmployee } from '../../interfaces/employee';

export const Employee = () => {
  const { guid } = useParams<{ guid: string }>();
  const [employee, setEmployee] = useState<IEmployee | undefined>(undefined);
  const [isEmployeeLoading, setIsEmployeeLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsEmployeeLoading(true);

    EmployeeApi.getInstance()
      .GetEmployeeByIdWithDetails(guid)
      .then(({ data }) => {
        setEmployee(data);
      })
      .finally(() => setIsEmployeeLoading(false));
  }, [guid]);

  return (
    <EmployeeForm
      formType={'update'}
      employeeDetails={employee}
      isLoading={isEmployeeLoading}
    />
  );
};
