import { useEffect } from 'react';
import { DepartmentApi } from '../api/department-api';
import { Department } from '../interfaces/department';

export const PopulateDepartmentOptionsEffect = (
  setDepartments: (d: Department[] | null) => void
) => {
  useEffect(() => {
    DepartmentApi.getInstance()
      .getAllDepartments(true)
      .then(({ data }) => setDepartments(data));
  }, [setDepartments]);
};
