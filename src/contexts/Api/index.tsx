import React, {useState} from 'react';
import * as defaults from './defaults';

import type {APIContextInterface} from './defaults';
import {AxiosRequestConfig} from 'axios';
import {request} from 'src/Utils';
import * as consts from 'src/config/consts';

export const APIContext = React.createContext<APIContextInterface>(
  defaults.defaultApiContext
);

export const useApi = () => React.useContext(APIContext);

export const APIProvider = ({children}: {children: React.ReactNode}) => {
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [url, setUrl] = useState<string>();
  const [state, setState] = useState<defaults.ApiState>('init');

  const query = async (config: AxiosRequestConfig) => {
    setState('progress');
    setUrl(config.url);

    config.url = `${consts.API_HOST}${config.url}`;

    try {
      const response = await request(config);
      setState('ready');
      setData(response.data);
    } catch (e: any) {
      setError(e);
      setState('error');
    }
  };

  return (
    <APIContext.Provider
      value={{
        data,
        error,
        state,
        url,
        query
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
