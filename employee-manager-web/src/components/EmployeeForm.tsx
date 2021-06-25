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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CheckIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { EmployeeApi } from '../api/employeeApi';

export const EmployeeForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm();

  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
  const dateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    setValue('age', dayjs(Date.now()).diff(dateOfBirth, 'years'));
  }, [dateOfBirth, setValue]);

  useEffect(() => {
    const employeeApi = EmployeeApi.getInstance();
    employeeApi.GetEmployees().then((data) => console.log(data));
  }, []);

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        resolve(null);
      }, 3000);
    });
  }

  return (
    <Box w="40%" height="100%" px={3}>
      <Heading mb={5} size={'xl'}>
        Employee Manager
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2} isInvalid={errors.departmentId} isRequired>
          <FormLabel htmlFor="departmentId">Department</FormLabel>
          <Select
            id="departmentId"
            {...register('departmentId', {
              validate: (value) => value > 0 || 'Department is required',
              valueAsNumber: true,
            })}
            onChange={(e) =>
              setIsDepartmentSelected(Number(e.target.value) > 0)
            }
          >
            <option value="0">Choose a Department...</option>
            <option value="1">IT</option>
            <option value="2">HR</option>
            <option value="3">Marketing</option>
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
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              placeholder="i.e. John"
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
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              placeholder="i.e. Doe"
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
          <FormLabel htmlFor="emailAddress">Email Address</FormLabel>
          <Input
            id="emailAddress"
            type={'email'}
            placeholder="i.e. john.doe@example.com"
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
            <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
            <Input
              id="dateOfBirth"
              type={'date'}
              placeholder="i.e. 06-08-1997"
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
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              id="age"
              type={'number'}
              placeholder="i.e. 24"
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
          <FormLabel htmlFor="salary">Salary</FormLabel>
          <InputGroup>
            <InputLeftAddon children="Rs." />
            <Input
              id="salary"
              type={'number'}
              placeholder="i.e. 65000.00"
              {...register('salary', {
                required: 'Salary is required',
                setValueAs: (value) => Number.parseFloat(value).toFixed(2),
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
