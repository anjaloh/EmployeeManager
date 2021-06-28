import { useEffect } from 'react';
import { Employee } from '../interfaces/employee';

export const ChangeFormStateEffect = (
  selectedEmployee: Employee | undefined,
  setFormState: (v: 'update' | 'create') => void
) => {
  useEffect(() => {
    setFormState(selectedEmployee ? 'update' : 'create');
  }, [selectedEmployee, setFormState]);
};
