'use client';

import { Provider } from 'react-redux';
import { initializeStore } from './store';

export default function ReduxProvider({ children, preloadedState }) {
  const store = initializeStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
}
