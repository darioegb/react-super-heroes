import { useState } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Column, ConfirmDialogConfig } from 'interfaces';
import { ConfirmDialog } from 'components/ConfirmDialog';

interface GridItemProps<T> {
  /**
   * Row item
   */
  row: T;
  /**
   * Column list
   */
  columns: Column<T>[];
  /**
   * Confirm dialog texts: title, cancelButtonText & confirmButtonText
   */
   confirmDialogConfig?: ConfirmDialogConfig;
  /**
   * Fired when view button is clicked
   */
  onView: (item: T, view: boolean) => void;
  /**
   * Fired when edit button is clicked
   */
  onEdit: (item: T) => void;
  /**
   * Fired when delete button is clicked
   */
  onDelete: (item: T) => void;
}

/**
 * GridItem is row grid using mui.
 */
export const GridItem = <T extends unknown>({
  columns,
  row,
  confirmDialogConfig: { title = '', cancelButtonText, confirmButtonText } = {
    title: '',
  },
  onView,
  onEdit,
  onDelete,
}: GridItemProps<T>) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => setOpen(true);

  const handleClose = (isOk: boolean) => {
    setOpen(false);
    isOk && onDelete(row);
  };

  return (
    <TableRow hover role="row" tabIndex={-1}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {!column.isImg ? (
              column.format && typeof value === 'number' ? (
                column.format(value)
              ) : (
                value ?? '-'
              )
            ) : (
              <img
                style={{ maxWidth: '5rem' }}
                alt="item or alt"
                src={
                  (value as unknown as string) ??
                  `${process.env.PUBLIC_URL}/img/no-image.png`
                }
              />
            )}
          </TableCell>
        );
      })}
      <TableCell role="cell">
        <IconButton
          data-testid="icon-button-visibility"
          aria-label="visibility"
          onClick={() => onView(row, true)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          color="primary"
          data-testid="icon-button-edit"
          aria-label="edit"
          onClick={() => onEdit(row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          data-testid="icon-button-delete"
          aria-label="delete"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <ConfirmDialog
        open={open}
        title={title}
        cancelButtonText={cancelButtonText}
        confirmButtonText={confirmButtonText}
        onClose={handleClose}
      />
    </TableRow>
  );
};
