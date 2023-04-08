// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const Wrapper = styled.ul`
  position: fixed;
  bottom: 20px;
  right: calc(50% - 200px);
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: flex-end;
  z-index: 10;
  background: #000;
  width: 500px;

  li {
    background: var(--background-primary);
    margin: 0.4rem 1.2rem;
    position: relative;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;

    h3 {
      color: #fff;
      font-family: 24px;
      flex: 1;
      text-transform: uppercase;
      text-align: center;
    }
    h5 {
      color: var(--text-color-secondary);
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      flex: 1;
      max-width: 100%;
    }
  }
`;
