import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  flex-grow: 1;
  justify-content: start;
  padding: 20px 0;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;

  .nav {
    gap: 10px;
    justify-content: right;
    display: flex;
    a {
      color: #000;
    }
  }
  .logo {
    a {
      color: #1337ff;
      text-decoration: none;
      font-weight: 600;
      font-size: 24px;
    }
  }
`;