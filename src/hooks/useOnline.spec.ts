import { renderHook } from '@testing-library/react-hooks';

import { useOnline } from './useOnline';

describe('useOnline', () => {
  it('should get online status', () => {
    const { result } = renderHook(() => useOnline());
    expect(result.current.isOnline).toBeTruthy();
  });
});
