import React, { useEffect, useState } from 'react';
import { DataTable } from './common/DataTable';
import { useMemo } from 'react';
import { Column } from 'react-table';
import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { EmployeeApi } from '../api/employee-api';
import { Employee } from '../interfaces/employee';

export const EmployeeTableSection = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    EmployeeApi.getInstance()
      .GetAllEmployees()
      .then(({ data }) => setEmployees(data));
  }, []);

  const data: Employee[] = useMemo(() => employees, [employees]);

  const columns: Column<Employee>[] = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Department',
        accessor: row => row.department.name,
      },
      {
        Header: 'Email',
        accessor: 'emailAddress',
      },
      // {
      //   Header: 'Date of Birth',
      //   accessor: 'dateOfBirth',
      //   Cell: props => dayjs(props.value).format('YYYY-MM-DD'),
      // },
      {
        Header: 'Age',
        accessor: 'age',
        isNumeric: true,
      },
      {
        Header: 'Salary (Rs.)',
        accessor: 'salary',
        isNumeric: true,
        Cell: props => Number(props.value).toFixed(2),
      },
      {
        Header: 'Created On',
        accessor: 'createdAt',
        Cell: props => dayjs(props.value).format('YYYY-MM-DD hh:mm A'),
      },
      {
        Header: 'Updated On',
        accessor: 'updatedAt',
        Cell: props => dayjs(props.value).format('YYYY-MM-DD hh:mm A'),
      },
    ],
    []
  );

  return (
    <Box maxWidth='100vw' height='100%' px={3} pt={14}>
      <DataTable data={data} columns={columns} />
    </Box>
  );
};
