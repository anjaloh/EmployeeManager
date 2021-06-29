import { Column } from 'react-table';

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: Column<Data>[];
};
