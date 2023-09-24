import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  padding: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: max-content;
  margin-bottom: 10px;
  margin-top: 20px;
  cursor: pointer;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
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

  @media only screen and (max-width: 700px) {
    width: auto;
    margin: initial;
    display: flex;
    flex-direction: column;
    padding: 0 0 20px 0;
  }      
`;


export const HeaderSideWrapper = styled.header`
  display: flex;
  position: relative;
  flex-grow: 1;
  justify-content: start;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 40px;
  position: fixed;
  top: 0;

  nav {  
    margin-top: 20px;
    justify-content: right;
    display: flex;
    align-items: start;
    border-radius: 6px;
    flex-direction: column;  
    
    h4 {
      font-size: 14px;
      margin-top: 40px;
    }
    ul {
      list-style-type: none;
      font-weight: 300;
      color: rgba(var(--color-primary-main),0.6);
      display: block;
      font-size: 18px;
      font-style: normal;
      line-height: 22px;
      letter-spacing: -0.48px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 6px;
      li {
        list-style-type: none;
      }
    }
  }

  .logo {
    position: relative;
    width: max-content;
    cursor: pointer;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    a {
      color: #1337ff;
      text-decoration: none;
      font-weight: 700;
      font-size: 32px;
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