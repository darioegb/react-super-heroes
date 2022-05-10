import { renderHook } from '@testing-library/react-hooks';

import { GenreEnum } from 'constant';
import { useCustomTranslate } from './useCustomTranslate';

describe('useCustomTranslate', () => {
  it('should translate dropDownValue', () => {
    const { result } = renderHook(() => useCustomTranslate());
    expect(result.current.dropdownTranslate('globals.enums.genres', 1, GenreEnum)).toBeDefined();
  });
});
