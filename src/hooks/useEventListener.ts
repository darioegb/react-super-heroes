import { useEffect } from 'react';

import { EventListenerHandler } from 'interfaces';

export const useEventListener = (
  target: EventListenerHandler,
  event: string | string[],
  callback: (event?: unknown) => void,
) => {
  useEffect(() => {
    Array.isArray(event)
      ? event.forEach((item) => target.addEventListener(item, callback))
      : target.addEventListener(event, callback);

    return () => {
      Array.isArray(event)
      ? event.forEach((item) => target.removeEventListener(item, callback))
      : target.removeEventListener(event, callback);
    };
  });
};
