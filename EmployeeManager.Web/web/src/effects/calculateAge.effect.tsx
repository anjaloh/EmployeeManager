import { useEffect } from 'react';
import dayjs from 'dayjs';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form';

export const CalculateAgeEffect = (
  setValue: UseFormSetValue<FieldValues>,
  dateOfBirth: any
) => {
  useEffect(() => {
    setValue('age', dayjs(Date.now()).diff(dateOfBirth, 'years'));
  }, [dateOfBirth, setValue]);
};
