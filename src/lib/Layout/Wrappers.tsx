import styled from 'styled-components';

export const ConnectButtonWrapper = styled.div`
  button {
    cursor: pointer;
    background-color: rgba(48 61 85 / 100%);
    color: #fff;
    border: 0;
    font-size: 16px !important;
    border-radius: 5px;
    display: flex;
    align-items: center;
    transition: 0.125s ease;
    height: 37px;
    font-size: 16px !important;
    font-weight: 500;
    padding: 10px 24px;
    transform: none;
    border-radius: 10px;
    /* min-width: 300px; */
    align-items: center;
    justify-content: center;

    height: 37px;
    font-size: 16px !important;
    font-weight: 500;
    padding: 10px 24px;
    transform: none;
    border-radius: 10px;

    &:disabled {
      color: #aaa;
    }
    span {
      margin-right: 5px !important;
    }
    &:hover {
      background-color: rgba(19 29 47 / 100%);
    }
    svg {
      margin-right: 5px;
      font-size: 28px;
    }
  }
  &.largeWhite {
    button {
      background: #fff;
    }
  }
  #authLogin {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;

    animation-name: shakeMe;
    animation-duration: 3s;
    animation-delay: 3s;
    animation-iteration-count: 2;
    animation-timing-function: linear;
  }
`;

export const LogoTelegramWrapper = styled.div`
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

export const MenuMainWrapper = styled.header`
  z-index: 100;
  padding: 20px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .menu {
    font-size: 28px;
    color: #fff;
    height: 50px;
    width: 50px;
    line-height: 50px;
    display: none;
  }
  nav {
    display: flex;
    gap: 25px;
    align-items: center;
    width: 100%;

    .logo {
      position: relative;
      width: max-content;
      cursor: pointer;
      height: 60px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      span {
        display: none;
      }
    }
    ul {
      display: flex;

      li {
        flex: 1;
        padding: 10px 15px;
        display: flex;

        &:hover,
        &.active {
          a {
            color: #aaa;
          }
        }
        &.sep {
          border-right: 1px solid #636363;
          padding-right: 40px;
          margin-right: 30px;
        }

        a {
          font-size: 16px;
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          width: max-content;
          display: flex;
          align-items: center;

          svg {
            font-size: 20px;
          }
        }

        &.social {
          padding: 10px 7px;
        }
        &.social.first {
          margin-left: 15px;
        }
      }
    }
    .auth {
      flex: 1;
      display: flex;
      justify-content: end;
    }
  }

  #mobileMenu {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 20px;

    h4 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 0px;
      margin-top: 15px;
      color: #fff;
    }
    ul {
      list-style-type: none;
      font-weight: 400;
      color: #fff;
      display: block;
      font-style: normal;
      line-height: 1.3;
      /* letter-spacing: -0.48px; */
      text-decoration: none;
      font-size: 18px;
      line-height: 1;

      li {
        list-style-type: none;
        cursor: pointer;
        float: left;
        text-align: left;
        margin-right: 10px;
        margin-bottom: 5px;

        p,
        a {
          color: #fff;
          font-size: 14px;
          font-weight: 400;

          &:hover {
            color: #999;
            text-decoration: none;
          }
        }
      }
    }
  }

  #downMenu {
    display: flex;
    width: 100%;
    height: 0px;
    transition: all 0.3s linear;
    overflow: hidden;

    &.help {
      height: 140px;
    }
    &.investor {
      height: 240px;
    }
    &.dashboard {
      height: 100px;
    }
    &.work {
      height: 170px;
    }
    &.developer {
      height: 100px;
    }
    ul {
      list-style-type: none;
      font-weight: 400;
      color: #fff;
      display: block;
      font-style: normal;
      line-height: 1.3;
      letter-spacing: -0.48px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 3px;
      font-size: 16px;
      padding: 10px 20px 20px 100px;
      transition: all 2.3s ease;

      li {
        list-style-type: none;
        cursor: pointer;
        text-align: left;

        p,
        a {
          color: #fff;
          font-size: 26px;
          font-weight: 500;

          &:hover {
            color: #999;
            text-decoration: none;
          }
        }
      }
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
    color: #fff;
    display: flex;

    span {
      margin-left: 10px;
      display: flex;
      a {
        display: flex;

        svg {
          font-size: 18px;
          margin-left: 5px;
          color: #666;
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .menu {
      display: block;
    }

    nav {
      ul {
        display: none !important;
      }
      .auth {
        align-items: center;
        justify-content: center;
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
        background-color: #fff;
        color: #000;

        height: 37px;
        font-size: 14px !important;
        padding: 10px 24px;
        -webkit-transform: none;
        -ms-transform: none;
        transform: none;
        width: 235px;
        justify-content: left;

        &:hover {
          background-color: rgba(var(--color-primary-main), 0.2);
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
