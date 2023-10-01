import styled from 'styled-components';

export const ConnectButtonWrapper = styled.div`
  button {
    cursor: pointer;
    background-color: rgba(var(--color-primary-main),0.1);
    color: rgba(var(--color-primary-main),1);
    border: 0;
    font-size: 17px !important;
    border-radius: 35px;
    padding: 10px 30px;
    font-weight: 600;
    height: 54px;
    display: flex;
    text-transform: capitalize;
    align-items: center;
    &:disabled {
      color: #aaa;
    }
    span {
      margin-right: 5px !important;
    }
              
    &:hover {
      transform: scale(105%);
      transition: 0.125s ease;
    } 
  }
  &.small {
    button {
      height: 37px;
      font-size: 14px !important;
      font-weight: 500;
      padding: 10px 24px;
      transform: none;
      width: 200px;

      span {
        img {
          width: 25px !important;
          height: 25px !important;
        }
      }
      &:hover {
        background-color: rgba(var(--color-primary-main),0.2);
      }
    }
  }
`;

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
    width: 100px;
    height: 100px;
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
  flex-direction: column;
  margin-top: 40px;
  position: fixed;
  top: 0;
  bottom: 40px;

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
      color: #5586d1;
    }
    ul {
      list-style-type: none;
      font-weight: 400;
      color: rgba(var(--color-primary-main),0.6);
      display: block;
      font-style: normal;
      line-height: 22px;
      letter-spacing: -0.48px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 3px;
      max-width: 250px;
      &.inline {
        flex-direction: row;
      }
      li {
        list-style-type: none;

        cursor: pointer;

        p,
        a {
          color: rgba(0, 0, 0, 0.6);
          &:hover {
            color: #000;
            text-decoration: none;
          }
        }
      }
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 280px;

    .downloadTimeTracker {
      width: 200px;
      border-radius: 20px;
      text-transform: capitalize;
      background: rgb(239, 239, 239);
      margin-top: 10px;
    }
    .copyright {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
      letter-spacing: -0.03em;
      margin-top: 30px;
      color: rgba(var(--color-primary-main), 0.5);
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


export const FaqWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin: 50px 0;
  width: 100%;

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