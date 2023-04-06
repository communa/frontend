import { AxiosRequestConfig } from "axios";

export type ApiState = 'progress' | 'ready' | 'error';

export interface APIContextInterface {
  state: ApiState;
  data: null,
  error: null,
  query: (config: AxiosRequestConfig) => void;
}

export const defaultApiContext: APIContextInterface = {
  data: null,
  error: null,
  state: 'ready',
  query: (config: AxiosRequestConfig) => { }
};
