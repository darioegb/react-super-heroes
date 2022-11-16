import { TextField } from '@mui/material';
import { useCustomTranslate } from 'hooks';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface TextfieldControllerProps {
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
   * TextField label
   */
  label: string;
  /**
   * TextField placeholder
   */
  placeholder?: string;
  /**
   * TextField variant style
   */
  variant?: 'filled' | 'outlined' | 'standard';
  /**
   * Error object from useForm
   */
  error?: Record<string, unknown>;
  /**
   * Flag to disabled textfield
   */
  disabled?: boolean;
  /**
   * TextField input type.
   */
  type?:
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  /**
   * Flag to enabled mutiline texfield
   */
  multiline?: boolean;
  /**
   * Number of rows when textfield is set to multiline
   */
  rows?: number;
  /**
   * Flag enabled uppercase text
   */
  uppercase?: boolean;
  /**
   * Display a counter with actual character agains characters limit
   */
  characterLimit?: number;
}

/**
 * TextfieldController is a mui-textfield wrapper that makes it easy to use.
 * Also contains some extra features like uppercase text and characters limitation counter.
 */
export const TextfieldController = ({
  name,
  control,
  defaultValue = '',
  label,
  placeholder = '',
  variant = 'standard',
  error,
  disabled = false,
  type = 'text',
  multiline = false,
  rows = 0,
  uppercase = false,
  characterLimit = 0,
}: TextfieldControllerProps) => {
  const { errorMessageTranslate } = useCustomTranslate();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder}
          inputProps={{
            type,
            ...(characterLimit > 0 && { maxLength: characterLimit }),
          }}
          variant={variant}
          error={!!error}
          helperText={
            characterLimit > 0 && !error
              ? `${field.value.length}/${characterLimit}`
              : errorMessageTranslate(error?.message as string)
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
