import styled from 'styled-components';

/* BodyInterfaceWrapper
 *
 * An element that houses SideInterface and MainInterface.
 * Used once in Router.
 */
export const BodyInterfaceWrapper = styled.body`
  display: flex;
  position: relative;
  flex-grow: 1;
`;

export const MainInterfaceWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
`;

export const ContractAirdropWrapper = styled.div`
  background: #f1f1f1c1;
  text-align: center;
  padding: 100px;
  border-radius: 12px;
  align-items: center;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 40px;
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      margin-right: 10px;
    }
  }
`;
export const HomePageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    .hero {
      position: relative;
      .tag-green-inner,
      .tag-purple-inner,
      .tag-blue-inner,
      .tag-orange-inner {
        opacity: 1;
        pointer-events: none;
        position: absolute;
        transition: opacity 400ms ease 0s;
        font-weight: 600;
        font-size: 14px;
        border: 1px solid #000;
        border-radius: 15px;
        padding: 3px 8px;

        transform: translateX(0px) scale(1);
        filter: blur(0px);
        cursor: pointer;
      }
      .tag-green-inner {
        opacity: 1;
        transform: rotate(-10deg);
        top: -30px;
        right: -100px;
        color: rgb(215, 219, 40);
        border: 1px solid rgb(215, 219, 40);
        border-color: linear-gradient(10deg, rgb(215, 219, 40) 0%, rgb(117, 168, 10) 100%);
      }
      .tag-orange-inner {
        transform: rotate(10deg);
        top: -30px;
        left: -120px;
        color: rgb(255, 145, 68);
        border: 1px solid rgb(255, 145, 68);
        border-color: linear-gradient(rgba(255, 255, 255,1), rgba(255, 255, 255,1)) padding-box, linear-gradient(135deg, #E2660F 0%, #FF9144 100%) border-box;
      }
      .tag-blue-inner {
        transform: rotate(-10deg);
        bottom: -30px;
        left: 0px;
        color: rgb(9, 173, 225);
        border: 1px solid rgb(9, 173, 225);
      }
      .tag-purple-inner {
        transform: rotate(10deg);
        bottom: -30px;
        right: -30px;
        color: rgb(148, 102, 246);
        border: 1px solid rgb(148, 102, 246);
      }
    }
    
    section {
      width: 800px;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px;
      
      p {
        opacity: 0.8;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.48px;
        line-height: 1.5;
        width: 600px;
        margin: 0 auto;
      }
      .helpLinks {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-top: 50px;
        margin-bottom: 20px;
        font-size: 16px;
        a {
          display: flex;
          gap: 8px;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          letter-spacing: -0.03em;
          /* color: rgba(var(--color-primary-main),0.5); */
          color: rgba(0,0,0,0.5);
        }
      }
      h1, h2, h3, h4, h5 {
        font-style: normal;
        font-weight: 700;
        font-size: 72px;
        line-height: 72px;
        text-align: center;
        letter-spacing: -0.02em;
      }
      h3 {
        font-size: 52px;
        margin-bottom: 10px;
        max-width: 600px;
        margin: 0 auto;
      }
      h5 {
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 27px;
        text-align: center;
        letter-spacing: -0.03em;
        color: rgba(var(--color-primary-main),1);
        opacity: 0.8;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 1.5;
      }
      .action {
        margin-top: 50px;
        gap: 30px;
        display: flex;
        justify-content: center;

        button,
          a {
            background: #1360d3;
            font-size: 18px;
            border-radius: 35px;
            padding: 10px 30px;
            font-weight: 600;
            color: #fff;
            height: 54px;
            cursor: pointer;
            text-transform: capitalize;
            transition: transform 0.125s ease;
            &:hover {
              transform: scale(105%);
              transition: 0.125s ease;
            } 
          }
        a { 
          background: linear-gradient(236.08deg, rgb(52, 60, 48) 12.34%, rgb(0, 0, 0) 86.37%);
          color: #fff;
          font-weight: 500;
          border-width: 0;
          font-weight: 500;
        }
        button {
          background-color: rgba(var(--color-primary-main),0.1);
          color: rgba(var(--color-primary-main),1);
          border: 0;
          font-size: 18px;
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
        }
      }
      .blueprint {
        margin-bottom: 40px;
        padding: 30px;
        border: 3px dashed rgba(var(--color-primary-main),0.08);
        border-radius: 12px;
      }
      &#index {
        min-height: 100vh;

        .helpLinks {
          margin-top: 20px;
        }
        .logo {
          margin-top: 50px;
          margin-bottom: 40px;
          a {
            font-size: 46px;
          }
        }
        h3 {
          margin-top: 15px;
        }
        .action {
          margin-top: 70px;
        }
        .jobsTotal {
          margin-top: 40px;
          color: rgba(0, 0, 0, 0.5);
          span {
            font-weight: 600;
          }
        }
      }
      &#howitworks {
        width: 1100px;
        h2 {
          margin-top: 100px;
        }
        .placeholder {
          margin-top: 0;
          height: 400px;
        }
      }
      &#fees {
        margin-top: 200px;
      }
      &#token {
        margin-top: 200px;
      }
      &#faq {
        height: auto;
        margin-bottom: 30px;
        width: 1000px;
        margin-top: 200px;

        .logo {
          margin-top: 140px;
          font-size: 38px;
          margin-bottom: 0;
        }
        .action {
          margin-top: 50px;
          margin-bottom: 70px;
        }
        .subtext {
          color: rgba(var(--color-primary-main),0.5);
        }
        .helpLinks {
          margin-top: 50px;
          margin-bottom: 20px;
        }
        .copyright {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          letter-spacing: -0.03em;
          color: rgba(var(--color-primary-main),0.5);
        }
        svg {
          cursor: pointer;
          font-size: 42px;
          color: #777;
        }
        li {
          justify-content: space-between;
          display: flex;
          align-items: center;
          button {
            display: flex;
            svg {
              font-size: 26px;
              color: #444;
            }
          }
        }
      }
    }
  }
  
  @media only screen and (max-width: 700px) {
    main {
      margin: 0 auto;
      width: calc(100vw - 40px);
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
  }
`;

export const JobsPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  main {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 320px auto;
    
    > aside {
      border-right: 1px solid #eee;
      padding-right: 60px;
      z-index: 100;
      padding: 40px;
      position: relative;
    }
    > article {
      padding: 80px 100px;
      display: flex;
      flex-direction: column;

      h2 {
        margin-bottom: 5px;
        font-size: 36px;
      }
      nav {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;

        &.links {
          a {
            color: #777;
          }
        }
      }
    }
    &#jobNew,
    &#jobEdit,
    &#userEdit {
      article {
        > h2 {
          font-size: 36px;
          margin-bottom: 30px;
          margin-top: 0;
        }
        form {
          > label {
            width: 100%;
            text-align: center;
            font-weight: 600;
            margin-bottom: 20px;
            margin-top: 10px;
          }
          .jobState {
            > label {
              color: #666;
              font-size: 14px;
            }
          }
        }
      }
    }
    &#userProfile {
      h3 {
        margin-top: 20px;
      }
    }
  }
  
  @media only screen and (max-width: 700px) {
    main {
      margin: 0 auto;
      width: calc(100vw - 40px);
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
  }
`;

export const DocumentPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  display: flex;
  flex-direction: column;

  main {
    display: grid;
    grid-template-columns: 320px auto;
    
    > aside {
      border-right: 1px solid #eee;
      padding-right: 60px;
      z-index: 100;
      padding: 40px;
      position: relative;
    }
    article {
      padding: 100px;
      display: flex;
      flex-direction: column;

      > aside {
        margin-top: 20px;
        padding: 20px;
        background: rgb(238, 238, 238);
        border-radius: 10px;
      }
      ol, ul {
        margin-left: 30px;
        margin-bottom: 20px;
        margin-top: 10px;
      }
      h1 {
        font-size: 42px;
        margin-bottom: 30px;
      }
      h2 {
        font-size: 24px;
        margin-bottom: 0;
        margin-top: 40px;
      }
      h3 {
        font-size: 18px;
        margin-top: 5px;
        margin-bottom: 2px;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    overflow: hidden;

    header {
      padding: 20px;
    }
    article {
      margin: inherit;
      width: auto;
      padding: 20px;
    }
  }
`;

export const UserPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1100px;
  margin: 0 auto;
  margin-bottom: 60px;
  
  main {
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    
    label {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 16px;
      color: #666;
    }
    .field {
      font-size: 28px;
      border-bottom: 1px solid #aaa;
    }    
  }

  @media only screen and (max-width: 700px) {
    margin: 0 auto;
    width: auto;
    padding: 20px;
    
    article {
      font-size: 16px;
    }
  }
`;