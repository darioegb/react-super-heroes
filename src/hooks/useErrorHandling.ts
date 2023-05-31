import { useCallback } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { useTranslation } from 'react-i18next';

import { HttpMethod } from 'types';
import { ANCHOR_ORIGIN, HTTP_METHOD_KEYS } from 'utils';
import { ErrorHandlingResult } from 'interfaces';

export const useErrorHandling = (): ErrorHandlingResult => {
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const showErrorMessage = useCallback(
    (message: string, variant: VariantType) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: ANCHOR_ORIGIN,
      });
    },
    [enqueueSnackbar],
  );

  const handleError = useCallback(
    (method: HttpMethod, value: string) => {
      navigator.onLine
        ? showErrorMessage(
            translate(`globals.toasts.${HTTP_METHOD_KEYS[method]}.error`, {
              value,
            }),
            'error',
          )
        : showErrorMessage(translate('globals.toasts.bgAsync'), 'warning');
    },
    [translate, showErrorMessage],
  );

  return {
    handleError,
  };
};
