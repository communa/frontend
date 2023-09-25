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
    background: #313131;
    color: #aaa;
    font-weight: 500;
    position: absolute;
    padding: 2px 5px;
    border-radius: 22px;
    font-size: 11px;
    right: -20px;
    opacity: 0.9;
    top: 10px;
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
      margin-top: 30px;
    }
    ul {
      list-style-type: none;
      font-weight: 300;
      color: rgba(var(--color-primary-main),0.6);
      display: block;
      font-size: 16px;
      font-style: normal;
      line-height: 22px;
      letter-spacing: -0.48px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 3px;
      max-width: 250px;
      &.inline {
        flex-direction: row;
      }
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
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    span {
      background: #313131;
      color: #aaa;
      font-weight: 500;
      position: absolute;
      padding: 2px 5px;
      border-radius: 22px;
      font-size: 10px;
      right: -20px;
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


export const FaqWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin: 50px 0;

  li {
    background: #f1f1f1c1;
    font-weight: 700;
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.03em;
    margin-bottom: 1px;
    padding: 20px;
    list-style: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    button {
      width: 40px;
    }

    &:first-child {
      border-radius: 12px 12px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 0px 12px 12px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    p {
      width: 100%;
      display: none;
    }
    &.active {
      p {
        display: block;
      }
    }    
  }
`;