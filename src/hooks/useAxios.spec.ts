import { renderHook } from '@testing-library/react-hooks';

import { useAxios } from './useAxios';
import { instances } from 'config/httpCommon';
import { HttpMethod } from 'types';
import { GenreEnum } from 'enums';

describe('useAxios', () => {
  const [instance] = instances;
  it('should make a successful request', async () => {
    const data = {
      id: '1',
      name: 'Test',
      genre: GenreEnum.Male,
      specialty: 'testing test',
    };
    const payload = { data };

    instance.request = jest.fn().mockResolvedValueOnce(payload);

    const { result } = renderHook(() => useAxios(instance));

    const { exec } = result.current;

    const requestConfig = {
      url: 'superHeroes/1',
      method: 'get' as HttpMethod,
    };

    const response = await exec(requestConfig);
    expect(response).toEqual({
      isError: false,
      data,
      count: undefined,
    });
  });

  it('should handle an error response', async () => {
    const error = new Error('Request failed');

    instance.request = jest.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useAxios(instance));

    const { exec } = result.current;

    const requestConfig = {
      url: '/endpoint',
      method: 'get' as HttpMethod,
    };

    const response = await exec(requestConfig);

    expect(response).toEqual({
      isError: true,
    });
  });

  it('should make a request and return response with count', async () => {
    const mockResponse = {
      data: { foo: 'bar' },
      headers: {
        'x-total-count': '10',
      },
    };

    instance.request = jest.fn().mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useAxios(instance));
    const { exec } = result.current;

    const fetchConfig = {
      url: '/api/data',
      method: 'get' as HttpMethod,
    };

    const response = await exec(fetchConfig);

    expect(instance.request).toHaveBeenCalledWith(fetchConfig);
    expect(response).toEqual({
      isError: false,
      data: mockResponse.data,
      count: 10,
    });
  });
});
