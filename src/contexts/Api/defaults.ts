import type { APIContextInterface } from 'contexts/Api/types';

export const defaultApiContext: APIContextInterface = {
  api: null,
  isReady: false,
  apiStatus: 'disconnected',
};
