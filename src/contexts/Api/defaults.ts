import {AxiosRequestConfig} from "axios";

export type ApiState = 'init' | 'progress' | 'ready' | 'error';

export interface APIContextInterface {
  state: ApiState;
  data: any,
  url: string | undefined,
  error: any,
  query: (config: AxiosRequestConfig) => void;
}

export const defaultApiContext: APIContextInterface = {
  data: null,
  error: null,
  url: undefined,
  state: 'init',
  query: (config: AxiosRequestConfig) => { }
};
