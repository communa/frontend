import type { MutableRefObject } from 'react';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const setStateWithRef = <T>(
  value: T,
  setState: (_state: T) => void,
  ref: MutableRefObject<T>
): void => {
  setState(value);
  ref.current = value;
};

export const request = (config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
  try {
    return Axios.request(config);
  } catch (e: any) {
    // console.log(e);
    // console.log(e.response.data);
    // console.log(e.response.data.errors);

    throw e;
  }
}