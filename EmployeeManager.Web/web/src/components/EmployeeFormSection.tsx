import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CheckIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Department } from '../interfaces/department';
import { DepartmentApi } from '../api/department-api';
import { MESSAGES } from '../constants/messages';
import { EmployeeApi } from '../api/employee-api';
import { Employee } from '../interfaces/employee';
import { AxiosError } from 'axios';

export const EmployeeFormSection = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm();

  const toast = useToast();
  const employeeApi: EmployeeApi = EmployeeApi.getInstance();

  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
  const dateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    setValue('age', dayjs(Date.now()).diff(dateOfBirth, 'years'));
  }, [dateOfBirth, setValue]);

  const [departments, setDepartments] = useState<Department[] | null>(null);

  useEffect(() => {
    DepartmentApi.getInstance()
      .getAllDepartments(true)
      .then(({ data }) => setDepartments(data));
  }, []);

  async function onSubmit(values: Employee) {
    return employeeApi
      .CreateEmployee(values)
      .then(({ data }) => {
        toast({
          title: MESSAGES.EMPLOYEE.CREATED,
          description: `${data.firstName}'s employee record has been saved to the database.`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      })
      .catch((error: AxiosError) => {
        toast({
          title: 'Something went wrong while creating new Employee record',
          description: error.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      });
  }

  return (
    <Box maxWidth='100vw' height='100%' px={3}>
      <Heading mb={5} size={'2xl'}>
        Employee Manager
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2} isInvalid={errors.departmentId} isRequired>
          <FormLabel htmlFor='departmentId'>Department</FormLabel>
          <Select
            id='departmentId'
            {...register('departmentId', {
              validate: value => value > 0 || 'Department is required',
              valueAsNumber: true,
            })}
            onChange={e => setIsDepartmentSelected(Number(e.target.value) > 0)}
          >
            <option value='0'>Choose a Department...</option>
            {departments?.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.departmentId && errors.departmentId.message}
          </FormErrorMessage>
        </FormControl>

        <HStack mb={2}>
          <FormControl
            isInvalid={errors.firstName}
            isRequired
            isDisabled={!isDepartmentSelected}
          >
            <FormLabel htmlFor='firstName'>First Name</FormLabel>
            <Input
              id='firstName'
              placeholder='i.e. John'
              {...register('firstName', {
                required: 'First name is required',
              })}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.firstName}
            isRequired
            isDisabled={!isDepartmentSelected}
          >
            <FormLabel htmlFor='lastName'>Last Name</FormLabel>
            <Input
              id='lastName'
              placeholder='i.e. Doe'
              {...register('lastName', {
                required: 'Last name is required',
              })}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl
          mb={2}
          isInvalid={errors.emailAddress}
          isRequired
          isDisabled={!isDepartmentSelected}
        >
          <FormLabel htmlFor='emailAddress'>Email Address</FormLabel>
          <Input
            id='emailAddress'
            type={'email'}
            placeholder='i.e. john.doe@example.com'
            {...register('emailAddress', {
              required: 'Email address is required',
            })}
          />
          <FormErrorMessage>
            {errors.emailAddress && errors.emailAddress.message}
          </FormErrorMessage>
        </FormControl>

        <HStack mb={2}>
          <FormControl
            isInvalid={errors.dateOfBirth}
            isRequired
            isDisabled={!isDepartmentSelected}
          >
            <FormLabel htmlFor='dateOfBirth'>Date of Birth</FormLabel>
            <Input
              id='dateOfBirth'
              type={'date'}
              placeholder='i.e. 06-08-1997'
              {...register('dateOfBirth', {
                required: 'Date of birth is required',
                valueAsDate: true,
              })}
            />
            <FormErrorMessage>
              {errors.dateOfBirth && errors.dateOfBirth.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.age}
            isRequired
            isReadOnly
            isDisabled={!isDepartmentSelected}
          >
            <FormLabel htmlFor='age'>Age</FormLabel>
            <Input
              id='age'
              type={'number'}
              placeholder='i.e. 24'
              {...register('age', {
                required: 'Age is required',
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.age && errors.age.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl
          mb={2}
          isInvalid={errors.salary}
          isRequired
          isDisabled={!isDepartmentSelected}
        >
          <FormLabel htmlFor='salary'>Salary</FormLabel>
          <InputGroup>
            <InputLeftAddon children='Rs.' />
            <Input
              id='salary'
              type={'number'}
              placeholder='i.e. 65000.00'
              {...register('salary', {
                required: 'Salary is required',
                setValueAs: value => Number.parseFloat(value).toFixed(2),
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.salary && errors.salary.message}
          </FormErrorMessage>
        </FormControl>

        <HStack mt={5}>
          <Spacer />
          <Button
            variant={'ghost'}
            type={'reset'}
            onClick={() => {
              reset();
              setIsDepartmentSelected(false);
            }}
          >
            Reset
          </Button>

          <Button
            isDisabled={!isDepartmentSelected}
            leftIcon={<CheckIcon />}
            colorScheme={'green'}
            isLoading={isSubmitting}
            type={'submit'}
          >
            Save
          </Button>
        </HStack>
      </form>
    </Box>
  );
};
