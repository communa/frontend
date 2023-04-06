import React, { useState } from 'react';
import * as defaults from './defaults';

import type { APIContextInterface } from './defaults';
import { AxiosRequestConfig } from 'axios';
import { request } from '../../Utils';

export const APIContext = React.createContext<APIContextInterface>(
  defaults.defaultApiContext
);

export const useApi = () => React.useContext(APIContext);

export const APIProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [state, setState] = useState<defaults.ApiState>('ready');

  const query = async (config: AxiosRequestConfig) => {
    setState('progress');

    try {
      const response = await request(config);
      setState('ready');
      console.log(response.data);
      setData(response.data);
    } catch (e: any) {
      setError(e)
      setState('error');
    }
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
