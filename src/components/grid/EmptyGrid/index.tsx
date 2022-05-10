import { TableCell, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EmptyGridProps {
  value: string;
}

export const EmptyGrid = ({ value }: EmptyGridProps) => {
  const { t: translate } = useTranslation();

  return (
    <TableRow tabIndex={-1} key={1}>
      <TableCell>{translate('globals.grid.noMatchingDataText', { value })}</TableCell>
    </TableRow>
  );
};
