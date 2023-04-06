export type ApiState = 'progress' | 'ready' | 'error';

export interface APIContextInterface {
  state: ApiState;
  data: null,
  error: null,
  query: (config: any) => void;
}

export const defaultApiContext: APIContextInterface = {
  data: null,
  error: null,
  state: 'ready',
  query: () => { }
};
