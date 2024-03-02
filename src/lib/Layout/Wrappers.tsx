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
    transition: 0.125s ease;

    &:disabled {
      color: #aaa;
    }
    span {
      margin-right: 5px !important;
    }              
    &:hover {
      transform: scale(105%);
    } 
  }
  &.largeWhite {
    button {
      background: #fff;
    }
  }
  &.small {
    button {
      height: 37px;
      font-size: 14px !important;
      font-weight: 500;
      padding: 10px 24px;
      transform: none;
      width: 190px;

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

  picture {
    position: relative;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  @media only screen and (max-width: 700px) {
    width: auto;
    margin: initial;
    display: flex;
    flex-direction: column;
    padding: 0 0 20px 0;
  }      
`;

export const HeaderSideWrapper = styled.aside`
  border-right: 1px solid #eee;
  padding-right: 60px;
  z-index: 100;
  padding: 40px;
  position: relative;
  
  header {
    display: flex;
    position: relative;
    flex-grow: 1;
    justify-content: start;
    flex-direction: column;
    margin-top: 40px;
    position: fixed;
    top: 0;
    bottom: 40px;
    
    .menu {
      font-size: 28px;
      color: #000;
      height: 50px;
      width: 50px;
      line-height: 50px;
      display:  none;
    }
    nav {  
      margin-top: 20px;
      justify-content: right;
      display: flex;
      align-items: start;
      border-radius: 6px;
      flex-direction: column;  
    
      h4 {
        font-size: 18px;
        margin-top: 30px;
        color: #5586d1;
        a {
          color: #5586d1;
        }
      }
      ul {
        list-style-type: none;
        font-weight: 400;
        color: rgba(var(--color-primary-main),0.6);
        display: block;
        font-style: normal;
        line-height: 1.3;
        letter-spacing: -0.48px;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-top: 3px;
        max-width: 250px;
        font-size: 16px;
        
        &.inline {
          flex-direction: row;
        }
        li {
          list-style-type: none;
          cursor: pointer;
          text-align: left;
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
        margin-top: 10px;
        font-size: 12px;
        border-radius: 20px;
        padding: 5px 15px;
        font-weight: 600;

        cursor: pointer;
        text-transform: inherit;
        transition: transform 0.125s ease;        
        font-weight: 500;
        border-width: 0;
        background-color: rgba(var(--color-primary-main),0.1);
        color: rgba(var(--color-primary-main),1);
        
        height: 37px;
        font-size: 14px !important;
        padding: 10px 24px;
        -webkit-transform: none;
        -ms-transform: none;
        transform: none;
        width: 190px;
        justify-content: left;
        
        &:hover{
          background-color: rgba(var(--color-primary-main),0.2);
        }
        svg {
          margin-right: 5px;
        }
      }
      .copyright {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        text-align: left;
        letter-spacing: -0.03em;
        margin-top: 20px;
        color: rgba(var(--color-primary-main), 0.5);
      }
    }
    
    .logo {
      position: relative;
      width: max-content;
      cursor: pointer;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      span {
        display: none;
      }
    }  
  }

  @media only screen and (max-width: 700px) {
    border-right: 0;
    padding: 0;

    header {
      display: block;
      position: fixed;
      left: 0px;
      top: 0;
      right: 0;
      margin: 0;
      padding: 0;
      bottom: 0;
      background: #fafafa;
      padding: 10px;
      height: 50px;
      overflow: hidden;
      border-bottom: 1px solid #e7e7e7;
      
      .menu {
        display: block;
      }
      nav {
        ul {
          display: block;
          max-width: 100%;
          li {
            float: left;
            margin-right: 10px;
          }
        }
      }            
      .logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        width: 100%;
        picture {
          display: flex;
          img {
            width: 50px;
            height: 50px;
          }
        }

        span {
          align-items: center;
          display: flex;
          gap: 20px;
          font-size: 15px;
          color: #333;
          display: block;
          text-transform: uppercase;
        }
      }
      footer {
        position: relative;

        .downloadTimeTracker {
          margin-top: 10px;
          font-size: 12px;
          border-radius: 20px;
          padding: 5px 15px;
          font-weight: 600;

          cursor: pointer;
          text-transform: inherit;
          transition: transform 0.125s ease;        
          font-weight: 500;
          border-width: 0;
          background-color: rgba(var(--color-primary-main),0.1);
          color: rgba(var(--color-primary-main),1);
          
          height: 37px;
          font-size: 14px !important;
          padding: 10px 24px;
          -webkit-transform: none;
          -ms-transform: none;
          transform: none;
          width: 190px;
          justify-content: left;
          
          &:hover{
            background-color: rgba(var(--color-primary-main),0.2);
          }
          svg {
            margin-right: 5px;
          }
        }
        .copyright {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.5;
          text-align: left;
          letter-spacing: -0.03em;
          margin-top: 20px;
          color: rgba(var(--color-primary-main), 0.5);
        }
      }      
      &.__active {
        height: 100vh;
      }
    }
    &.__open {
      header {
        height: 100vh;
        nav {
          margin-top: 0;
        }
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