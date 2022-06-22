import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Control, FieldValues, Controller } from 'react-hook-form';

import { Option } from 'interfaces';
import { useCustomTranslate } from 'hooks';

interface SelectControllerProps {
  name: string;
  control: Control<FieldValues, object>;
  defaultValue: unknown;
  label: string;
  defaultSelectLabel: string;
  options: Option[];
  optionLabels: { path: string; type: { [key: number]: string } };
  placeholder?: string;
  error?: Record<string, string>;
  disabled?: boolean;
}

export const SelectController = ({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  error,
  disabled,
  defaultSelectLabel,
  options,
  optionLabels: { path, type },
}: SelectControllerProps) => {
  const { dropdownTranslate } = useCustomTranslate();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <FormControl variant="filled" fullWidth error={!!error} data-testid="select-control">
          <InputLabel>{label}</InputLabel>
          <Select {...field} placeholder={placeholder} disabled={disabled}>
            <MenuItem value="" disabled>
              <em>{defaultSelectLabel}</em>
            </MenuItem>
            {options.map(({ key, value }) => (
              <MenuItem value={value} key={key}>
                {dropdownTranslate(path, +value, type)}
              </MenuItem>
            ))}
          </Select>
          {!!error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
