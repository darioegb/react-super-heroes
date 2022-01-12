import { useState, useMemo, useEffect } from 'react';
import http from 'config/httpCommon';

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  const interceptors = useMemo(() => {
    const increment = () => setCounter((state) => state + 1);
    const decrement = () => setCounter((state) => state - 1);

    return {
      request: (config: unknown) => {
        increment();
        return config;
      },
      response: (response: unknown) => {
        decrement();
        return response;
      },
      error: (error: unknown) => {
        decrement();
        return Promise.reject(error);
      },
    };
  }, []); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const reqInterceptor = http.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const resInterceptor = http.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      http.interceptors.request.eject(reqInterceptor);
      http.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return [counter > 0];
};
