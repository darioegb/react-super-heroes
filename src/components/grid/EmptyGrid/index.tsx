import { TableCell, TableRow } from '@mui/material';

interface EmptyGridProps {
  /**
   * Message to display
   */
  message: string;
  /**
   * Input filter value
   */
  value: string;
}

/**
 * EmptyGrid is text with empty grid message using mui.
 */
export const EmptyGrid = ({ message, value }: EmptyGridProps) => {
  return (
    <TableRow tabIndex={-1} key={1} data-testid="empty-grid-row">
      <TableCell>{`${message} ${value}`}</TableCell>
    </TableRow>
  );
};
