import { createContext, Dispatch } from 'react';

const DispatchContext = createContext<Dispatch<{
  type: string;
  payload?: any;
}> | null>(null);

export default DispatchContext;
