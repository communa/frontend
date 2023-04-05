export type ApiStatus = 'connecting' | 'connected' | 'disconnected';

export interface APIContextInterface {
  api: any | null;
  isReady: boolean;
  apiStatus: ApiStatus;
}
