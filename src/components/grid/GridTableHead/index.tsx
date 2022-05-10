import { MouseEvent } from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableSortLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Column } from 'interfaces';
import { Order } from 'types';

interface GridTableHeadProps<T> {
  order: Order;
  orderBy: keyof T;
  columns: Column<T>[];
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  onAddOrEditOrView: (item?: T, view?: boolean) => void;
}

export const GridTableHead = <T extends unknown>({
  order,
  orderBy,
  columns,
  onAddOrEditOrView,
  onRequestSort,
}: GridTableHeadProps<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns?.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              <strong>{column.label}</strong>
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <IconButton
            color='primary'
            aria-label='add'
            onClick={() => onAddOrEditOrView()}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
