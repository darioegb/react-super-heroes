import { useState } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Column } from 'interfaces';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { useTranslation } from 'react-i18next';

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
  const { t: translate } = useTranslation();
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
                value || '-'
              )
            ) : (
              <img
                style={{ maxWidth: '5rem' }}
                alt="item or alt"
                src={
                  (value as unknown as string) ||
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
          onClick={() => onAddOrEditOrView(row, true)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          color="primary"
          data-testid="icon-button-edit"
          aria-label="edit"
          onClick={() => onAddOrEditOrView(row)}
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
        title={translate('globals.dialogs.delete.title', {
          value: row['name' as keyof T],
        })}
        onClose={handleClose}
      />
    </TableRow>
  );
};
