import { ErrorMessage } from 'interfaces';

export const isErrorMessage = (
  value: ErrorMessage | Record<string, ErrorMessage>,
): value is ErrorMessage => !!(value as ErrorMessage).key;
