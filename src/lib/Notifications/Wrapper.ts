import styled from 'styled-components';

export const Wrapper = styled.ul`
  position: fixed;
  bottom: 50px;
  /* right: calc(50% - 250px); */
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: flex-end;
  z-index: 10;
  height: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  
  li {
    background: #5586d1;
    margin: 0.4rem 1.2rem;
    position: relative;
    border-radius: 50px;
    padding: 40px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;

    h3 {
      color: #fff !important;
      font-size: 16px !important;
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
