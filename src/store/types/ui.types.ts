export interface UIState {
  modals: {
    [key: string]: {
      isOpen: boolean;
    };
  };
}
