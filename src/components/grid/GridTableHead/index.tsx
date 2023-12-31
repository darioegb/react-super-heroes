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
  /**
   * Order rows
   */
  order: Order;
  /**
   * Sort by specific column
   */
  orderBy: keyof T;
  /**
   * Column list
   */
  columns: Column<T>[];
  /**
   * Fired when sort change
   */
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  /**
   * Fired when add button is clicked
   */
  onAdd: () => void;
}

/**
 * GridTableHead is header row grid using mui, also contain a column with add button.
 */
export const GridTableHead = <T extends unknown>({
  order,
  orderBy,
  columns,
  onAdd,
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
            sx={{ minWidth: column.minWidth }}
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
            color="primary"
            aria-label="add"
            data-testid="add-button"
            onClick={() => onAdd()}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
