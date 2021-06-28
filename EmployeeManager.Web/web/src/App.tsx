import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { EmployeeIndex } from './components/Employee/EmployeeIndex';

export const App = () => (
  <ChakraProvider theme={theme}>
    <EmployeeIndex />
  </ChakraProvider>
);
