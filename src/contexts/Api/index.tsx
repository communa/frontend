import type { APIContextInterface, ApiStatus } from 'contexts/Api/types';
import React, { useState } from 'react';
import * as defaults from './defaults';

export const APIContext = React.createContext<APIContextInterface>(
  defaults.defaultApiContext
);

export const useApi = () => React.useContext(APIContext);

export const APIProvider = ({ children }: { children: React.ReactNode }) => {
  // Store povider instance.
  const [provider, setProvider] = useState<null>(null);

  // API instance state.
  const [api, setApi] = useState<null>(null);

  // Store API connection status.
  const [apiStatus, setApiStatus] = useState<ApiStatus>('disconnected');

  return (
    <APIContext.Provider
      value={{
        api,
        isReady: apiStatus === 'connected' && api !== null,
        apiStatus,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
