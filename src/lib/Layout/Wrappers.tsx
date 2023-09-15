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
    padding: 10px 15px;
    border-radius: 6px;
    background: #f5f5f5;
    a {
      font-size: 18px;
      text-decoration: none;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
    button {
      font-weight: 600;
    }
  }
  .logo {
    position: relative;
    width: max-content;
    margin-bottom: 10px;
    a {
      color: #1337ff;
      text-decoration: none;
      font-weight: 700;
      font-size: 42px;
      line-height: 1;
    }
    span {
      background: #aaa;
      color: #000;
      font-weight: 500;
      position: absolute;
      padding: 2px 5px;
      border-radius: 2px;
      font-size: 12px;
      right: -30px;
      opacity: 0.9;
      top: 2px;
    }
  }

  @media only screen and (max-width: 700px) {
    width: auto;
    margin: initial;
    display: flex;
    flex-direction: column;
    padding: 0 0 20px 0;
    
    .nav {
      justify-content: left;
      gap: 10px;
      button,
      a {
        font-size: 15px;
      }
    }
  }      
`;