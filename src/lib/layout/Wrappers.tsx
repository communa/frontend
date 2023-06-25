import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  flex-grow: 1;
  justify-content: start;
  padding: 40px 0;
  justify-content: space-between;
  width: 1100px;
  margin: 0 auto;

  .nav {
    gap: 20px;
    justify-content: right;
    display: flex;
    align-items: center;
    a {
      font-size: 18px;
      text-decoration: none;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
    button {
      background: none;
      font-size: 18px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      border-left: 1px solid #000;
      padding-left: 20px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .logo {
    position: relative;
    a {
      color: #1337ff;
      text-decoration: none;
      font-weight: 700;
      font-size: 42px;
      line-height: 1;
    }
    span {
      background: #1337ff;
      color: #fff;
      position: absolute;
      padding: 2px 5px;
      border-radius: 2px;
      font-size: 12px;
      right: -30px;
      opacity: 0.9;
      top: 2px;
    }
  }
`;