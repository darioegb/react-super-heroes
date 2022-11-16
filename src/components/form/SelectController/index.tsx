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
  /**
   * Name of control
   */
  name: string;
  /**
   * Form control from useForm
   */
  control: Control<FieldValues, object>;
  /**
   * Default control value
   */
  defaultValue: unknown;
  /**
   * Select label
   */
  label: string;
  /**
   * Default select label
   */
  defaultSelectLabel: string;
  /**
   * Select options
   */
  options: Option[];
  /**
   * Select options path to translate values using custom translator base on useTranslation from react-i18next.
   */
  optionLabelPath?: string;
  /**
   * Select placeholder
   */
  placeholder?: string;
  /**
   * Error object from useForm
   */
  error?: Record<string, unknown>;
  /**
   * Flag to disabled select
   */
  disabled?: boolean;
}

/**
 * SelectController is a mui-select wrapper that makes it easy to use.
 */
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
  optionLabelPath,
}: SelectControllerProps) => {
  const { dropdownTranslate } = useCustomTranslate();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <FormControl
          variant="filled"
          fullWidth
          error={!!error}
          data-testid="select-control"
        >
          <InputLabel>{label}</InputLabel>
          <Select {...field} placeholder={placeholder} disabled={disabled}>
            <MenuItem value="" disabled>
              <em>{defaultSelectLabel}</em>
            </MenuItem>
            {options.map(({ key, value }) => (
              <MenuItem value={value} key={key}>
                {optionLabelPath
                  ? dropdownTranslate(optionLabelPath, key)
                  : key}
              </MenuItem>
            ))}
          </Select>
          {!!error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
