export interface EventListenerHandler {
  addEventListener: (
    event: string,
    callback: (event?: unknown) => void,
  ) => void;
  removeEventListener: (
    event: string,
    callback: (event?: unknown) => void,
  ) => void;
}
