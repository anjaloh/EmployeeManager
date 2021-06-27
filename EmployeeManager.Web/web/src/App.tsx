import * as React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { EmployeeFormSection } from './components/EmployeeFormSection';
import { EmployeeTableSection } from './components/EmployeeTableSection';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <ColorModeSwitcher justifySelf='flex-end' />
        <VStack spacing={8}>
          <EmployeeFormSection />
          <EmployeeTableSection />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
