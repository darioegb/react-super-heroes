import { TextField } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { StringOrNumber } from 'types';

interface TextfieldControllerProps {
  name: string;
  control: Control<FieldValues, object>;
  defaultValue: unknown;
  label: string;
  placeholder?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  error?: Record<string, string>;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  multiline?: boolean;
  rows?: StringOrNumber;
  uppercase?: boolean;
  characterLimit?: number;
}

export const TextfieldController = ({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  variant,
  error,
  disabled,
  type,
  multiline,
  rows,
  uppercase,
  characterLimit,
}: TextfieldControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder || ''}
          inputProps={{ type: type || 'text' }}
          variant={variant || 'standard'}
          error={!!error}
          helperText={
            characterLimit && !error
              ? `${field.value.length}/${characterLimit}`
              : error?.message
          }
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          onChange={(event) =>
            field.onChange(
              uppercase ? event.target.value.toUpperCase() : event.target.value,
            )
          }
        />
      )}
    />
  );
};
