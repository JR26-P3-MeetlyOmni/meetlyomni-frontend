'use client';

import { Provider } from 'react-redux';
import { store } from './store';

/**
 * Wraps React components with a Redux store context, enabling access to the Redux state throughout the component tree.
 *
 * @param children - The React nodes to be rendered within the Redux provider context
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}