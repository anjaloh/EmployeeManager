import * as React from 'react';
import { ChakraProvider, Box, HStack, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeTable } from './components/EmployeeTable';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <ColorModeSwitcher justifySelf='flex-end' />
        <HStack spacing={8}>
          <EmployeeForm />
          <EmployeeTable />
        </HStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
