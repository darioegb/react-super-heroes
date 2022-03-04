import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FilterGridProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FilterGrid = ({ handleChange }: FilterGridProps) => {
  const { t: translate } = useTranslation();

  return (
    <TextField
      label={translate('globals.grid.filterInput.label')}
      placeholder={translate('globals.grid.filterInput.placeholder')}
      margin="normal"
      fullWidth
      onChange={handleChange}
    />
  );
};
