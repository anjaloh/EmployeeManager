import { ButtonGroup, IconButton, Spinner, useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Employee } from '../../interfaces/employee';
import { Column } from 'react-table';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FaEdit, FaTrashAlt } from 'react-icons/all';
import { EmployeeApi } from '../../api/employee-api';
import { DataTable } from '../common/DataTable';
import { Link as RouterLink } from 'react-router-dom';
import { EmployeeService } from '../../services/employee-service';

dayjs.extend(utc);

export const EmployeeTable = () => {
  const toast = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const data: Employee[] = useMemo(() => employees, [employees]);

  const deleteClickHandler = useCallback(
    (guid: string, firstName: string) => {
      // eslint-disable-next-line no-restricted-globals
      const response = confirm(
        `Are you sure you want to remove ${firstName}'s Employee record?`
      );

      if (response) {
        const employeeService = new EmployeeService(toast);
        employeeService.deleteEmployee(guid).then(() => setNeedRefresh(true));
      }
    },
    [toast]
  );

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
        Cell: props =>
          dayjs.utc(props.value).local().format('YYYY-MM-DD hh:mm A'),
      },
      {
        Header: 'Updated On',
        accessor: 'updatedAt',
        Cell: props =>
          dayjs.utc(props.value).local().format('YYYY-MM-DD hh:mm A'),
      },
      {
        Header: 'Action',
        accessor: 'guid',
        Cell: props => (
          <ButtonGroup spacing={3}>
            <IconButton
              as={RouterLink}
              to={`/employees/${props.value}`}
              rounded={'md'}
              aria-label={'Update this record'}
              icon={<FaEdit />}
              colorScheme={'orange'}
            />

            <IconButton
              rounded={'md'}
              aria-label={'Delete this record'}
              icon={<FaTrashAlt />}
              colorScheme={'red'}
              onClick={() =>
                deleteClickHandler(props.value, props.row.original.firstName)
              }
            />
          </ButtonGroup>
        ),
      },
    ],
    [deleteClickHandler]
  );

  useEffect(() => {
    setIsLoading(true);

    EmployeeApi.getInstance()
      .GetAllEmployees()
      .then(({ data }) => setEmployees(data))
      .finally(() => {
        setIsLoading(false);
        setNeedRefresh(false);
      });
  }, [needRefresh]);

  return (
    <>
      {isLoading && <Spinner size={'xl'} thickness={'4px'} />}
      {!isLoading && <DataTable data={data} columns={columns} />}
    </>
  );
};
