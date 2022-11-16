import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface FilterGridProps {
  /**
   * Label for textfield
   */
  label: string;
  /**
   * Placeholder for textfield
   */
  placeholder?: string;
  /**
   * Fired when change texfield
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * FilterGrid is an input search using mui.
 */
export const FilterGrid = ({
  label,
  placeholder = '',
  ...others
}: FilterGridProps) => {
  return (
    <TextField
      margin="normal"
      type="search"
      label={label}
      placeholder={placeholder}
      {...others}
    />
  );
};
