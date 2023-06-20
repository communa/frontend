import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  flex-grow: 1;
  justify-content: start;
  padding: 40px 0;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;

  .nav {
    gap: 20px;
    justify-content: right;
    display: flex;
    align-items: end;
    align-items: end;
    a {
      font-size: 16px;
      text-decoration: none;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .logo {
    a {
      color: #1337ff;
      text-decoration: none;
      font-weight: 600;
      font-size: 40px;
      line-height: 1;
    }
  }
`;