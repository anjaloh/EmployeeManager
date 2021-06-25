import * as React from 'react';
import { ChakraProvider, Grid, HStack, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeTable } from './components/EmployeeTable';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Grid minH="100vh" p={2}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <HStack spacing={2}>
        <EmployeeForm />
        <EmployeeTable />
      </HStack>
    </Grid>
  </ChakraProvider>
);
