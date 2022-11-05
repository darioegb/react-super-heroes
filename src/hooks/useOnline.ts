import { useState } from 'react';

import { useEventListener } from './useEventListener';

export const useOnline = () => {
  const [isOnline, setNetwork] = useState(navigator.onLine);

  const updateNetwork = () => {
    setNetwork(navigator.onLine);
  };

  useEventListener(window, ['online', 'offline'], updateNetwork);

  return { isOnline };
};
