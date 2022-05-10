import { TextField } from '@mui/material';
import { useCustomTranslate } from 'hooks';
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
  const { errorMessageTranslate } = useCustomTranslate();

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
              : errorMessageTranslate(error?.message)
          }
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          onChange={({ target: { value } }) =>
            field.onChange(uppercase ? value.toUpperCase() : value)
          }
        />
      )}
    />
  );
};
