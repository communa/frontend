import React, { useState } from 'react';
import * as defaults from './defaults';

import type { APIContextInterface } from './defaults';

export const APIContext = React.createContext<APIContextInterface>(
  defaults.defaultApiContext
);

export const useApi = () => React.useContext(APIContext);

export const APIProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [state, setState] = useState<defaults.ApiState>('ready');

  const query = (config: any) => {
    setState('ready');
    setData('a');
    setError('b');
  };

  return (
    <APIContext.Provider
      value={{
        data,
        error,
        state,
        query,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
