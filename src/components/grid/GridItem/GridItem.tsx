import { IconButton, TableCell, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Column } from 'interfaces';

interface GridItemProps<T> {
  row: T;
  columns: Column<T>[];
  onAddOrEditOrView: (item?: T, view?: boolean) => void;
  onDelete: (item: T) => void;
}

export const GridItem = <T extends unknown>({
  columns,
  row,
  onAddOrEditOrView,
  onDelete,
}: GridItemProps<T>) => {
  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {!column.isImg ? (
              column.format && typeof value === 'number' ? (
                column.format(value)
              ) : (
                value || '-'
              )
            ) : (
              <img
                style={{ maxWidth: '5rem' }}
                alt='item or alt'
                src={
                  (value as unknown as string) ||
                  `${process.env.PUBLIC_URL}/img/no-image.png`
                }
              />
            )}
          </TableCell>
        );
      })}
      <TableCell>
        <IconButton
          aria-label='visibility'
          onClick={() => onAddOrEditOrView(row, true)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          color='primary'
          aria-label='edit'
          onClick={() => onAddOrEditOrView(row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color='error'
          aria-label='delete'
          onClick={() => onDelete(row)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
