import type {MutableRefObject} from 'react';
import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {SendTransactionRequest} from '@tonconnect/ui-react';
import { Address, beginCell, toNano } from '@ton/core';

import {IUser} from './interface/IUser';

export const setStateWithRef = <T>(
  value: T,
  setState: (_state: T) => void,
  ref: MutableRefObject<T>
): void => {
  setState(value);
  ref.current = value;
};

export const request = (
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  try {
    return Axios.request(config);
  } catch (e: any) {
    // console.log(e);
    // console.log(e.response.data);
    // console.log(e.response.data.errors);

    throw e;
  }
};

export const getAddressNetwork = (address: string) => {
  const isEth = address.length === 42;

  return isEth ? 'EVM' : 'TON'
}


export const addressToShort = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(38, 44)}`;
}

export const buildTransactionTon = async (user: IUser, comment: string) => {
  const response = await request({
    url: 'https://tonapi.io/v2/rates?tokens=usd&currencies=ton',
  });
  const price = response.data.rates.USD.prices.TON;
  const priceInTon = price * user.price;
  
  const body = beginCell()
  .storeUint(0, 32)
  .storeStringTail(comment)
  .endCell();

  const transaction: SendTransactionRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 360 * 6,
    messages: [
        {
          address: user.address,
          amount: toNano(priceInTon).toString(),
          payload: body.toBoc().toString("base64"),
        }
    ]
  };

  return transaction;
}

export const buildTransactionUsdtTon = (user: IUser, comment: string) => {
  const destinationAddress = Address.parse(user.address);

  const forwardPayload = beginCell()
      .storeUint(0, 32) // 0 opcode means we have a comment
      .storeStringTail('Hello, TON!')
      .endCell();

  const body = beginCell()
      .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
      .storeUint(0, 64) // query id
      .storeCoins(toNano(5)) // jetton amount, amount * 10^9
      .storeAddress(destinationAddress) // TON wallet destination address
      .storeAddress(destinationAddress) // response excess destination
      .storeBit(0) // no custom payload
      .storeCoins(toNano(user.price)) // forward amount (if >0, will send notification message)
      .storeBit(1) // we store forwardPayload as a reference
      .storeRef(forwardPayload)
      .endCell();

  const transaction: SendTransactionRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 360 * 6,
    messages: [
        {
          address: user.address,
          amount: toNano(user.price).toString(),
          payload: body.toBoc().toString("base64"),
        }
    ]
  };

  return transaction;
}