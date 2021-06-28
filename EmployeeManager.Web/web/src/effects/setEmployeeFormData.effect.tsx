import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Employee } from '../interfaces/employee';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form';

export const SetEmployeeFormDataEffect = (
  selectedEmployee: Employee | undefined,
  setValue: UseFormSetValue<FieldValues>,
  setIsDepartmentSelected: (v: boolean) => void
) => {
  useEffect(() => {
    if (selectedEmployee) {
      setValue('departmentId', selectedEmployee.department.id);
      setIsDepartmentSelected(true);
      setValue('firstName', selectedEmployee.firstName);
      setValue('lastName', selectedEmployee.lastName);
      setValue('emailAddress', selectedEmployee.emailAddress);
      setValue(
        'dateOfBirth',
        dayjs(selectedEmployee.dateOfBirth).format('YYYY-MM-DD')
      );
      setValue('age', selectedEmployee.age);
      setValue('salary', Number(selectedEmployee.salary).toFixed(2).toString());
    }
  }, [selectedEmployee, setValue, setIsDepartmentSelected]);
};
