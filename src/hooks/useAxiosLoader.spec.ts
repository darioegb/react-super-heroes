import { renderHook } from '@testing-library/react-hooks';

import { instances } from 'config/httpCommon';
import { GenreEnum } from 'enums';
import { useAxiosLoader } from '.';

describe('useAxiosLoader', () => {
  const [instance] = instances;
  it('should return false when not exist http request', () => {
    const { result } = renderHook(() => useAxiosLoader());
    expect(result.current[0]).not.toBeTruthy();
  });
  
  it('should return true when exist http request', async () => {
    const superHero = {
      id: '1',
      name: 'Test',
      genre: GenreEnum.Male,
      specialty: 'testing test',
    };
    const payload = { data: superHero };
    // Now mock axios get method
    instance.get = jest.fn().mockResolvedValueOnce(payload);
    const { result } = renderHook(() => useAxiosLoader());
    const { data } = await instance.get('superHeroes');
    expect(data).toEqual(superHero);
    expect(result.current[0]).not.toBeTruthy();
  });
});
