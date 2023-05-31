import { renderHook } from '@testing-library/react-hooks';

import { mockSnackBar } from 'setupTests';
import { useErrorHandling } from './useErrorHandling';

describe('useErrorHandling', () => {
  it('should call enqueueSnackbar with correct message and variant', () => {    
    const { result } = renderHook(() => useErrorHandling());
    result.current.handleError('get', 'example');

    expect(mockSnackBar).toHaveBeenCalledWith('globals.toasts.get.error', {
      variant: 'error',
      anchorOrigin: expect.anything(),
    });
  });

  it('handleError should show offline message when there is no connection', () => {
    const { result } = renderHook(() => useErrorHandling());
    
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    });
  
    result.current.handleError('get', 'example');
  
    expect(mockSnackBar).toHaveBeenCalledWith('globals.toasts.bgAsync', {
        variant: 'warning',
        anchorOrigin: expect.anything(),
      });
  });
  
});
