import { useState, useMemo, useEffect } from 'react';
import { instances } from 'config/httpCommon';

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
    instances.forEach((instance) => {
      // add request interceptors
      const reqInterceptor = instance.interceptors.request.use(
        interceptors.request,
        interceptors.error,
      );
      // add response interceptors
      const resInterceptor = instance.interceptors.response.use(
        interceptors.response,
        interceptors.error,
      );
      return () => {
        // remove all intercepts when done
        instance.interceptors.request.eject(reqInterceptor);
        instance.interceptors.response.eject(resInterceptor);
      };
    });
  }, [interceptors]);

  return [counter > 0];
};
