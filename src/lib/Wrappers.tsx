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

export const HomePageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  main {
    margin: 0 auto;
    width: 1100px;
    display: flex;
    
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    section {
      width: 800px;
      flex-direction: column;
      align-items: center;
      text-align: center;
      height: 100vh;
      padding: 20px;

      .helpLinks {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-top: 50px;
        margin-bottom: 20px;
        font-size: 16px;
        text-decoration: underline;
        a {
          display: flex;
          gap: 8px;
          /* margin: 30px 0px 0px; */
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          letter-spacing: -0.03em;
          color: rgba(var(--color-primary-main),0.5);
        }
      }
      h1, h2 {
        font-style: normal;
        font-weight: 700;
        font-size: 72px;
        line-height: 72px;
        text-align: center;
        letter-spacing: -0.02em;
      }
      h3 {
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 27px;
        text-align: center;
        letter-spacing: -0.03em;
        color: rgba(var(--color-primary-main),1);
        opacity: 0.8;
        margin-top: 20px;
      }
      .action {
        margin-top: 50px;
        gap: 50px;
        display: flex;
        justify-content: center;
      }
      .faq {
        display: flex;
        flex-direction: column;
        gap: 1px;
        margin: 50px 0;

        li {
          background: #f1f1f1;
          font-weight: 700;
          font-size: 24px;
          line-height: 40px;
          letter-spacing: -0.03em;
          margin-bottom: 1px;
          padding: 20px;
          list-style: none;
          text-align: left;

          &:first-child {
            border-radius: 12px 12px 0px 0px;
          }
          &:last-child {
            border-radius: 0px 0px 12px 12px;
          }
        }
      }
      &#index {
        .helpLinks {
          margin-top: 10px;
        }
        .logo {
          margin-top: 60px;
          margin-bottom: 60px;
          a {
            font-size: 46px;
          }
        }
        h3 {
          margin-top: 15px;
        }
        .action {
          margin-top: 100px;
        }
      }
      &#faq {
        height: auto;
        margin-bottom: 30px;
        width: 1000px;

        .logo {
          margin-top: 100px;
        }
        .action {
          margin-top: 50px;
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
      /* border-left: 1px solid rgba(var(--color-primary-main),0.1); */
      padding: 80px 100px;
      min-height: 100vh;
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

        a.active {
          text-decoration: underline;
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

export const PaymentPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  main {
    margin: 0 auto;
    width: 1100px;
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    
    h2 {
      margin-bottom: 5px;
      font-size: 36px;
    }
    nav {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;

      a.active {
        text-decoration: underline;
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
    min-height: 100vh;
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
      min-height: 100vh;
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

export const ActivityPublishWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1100px;
  justify-content: center;
  margin: 0 auto;
  padding-bottom: 100px;
  
  main {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 36px;
      margin-bottom: 20px;
    }
    nav {
      display: flex;
      gap: 10px;
      a {
        color: #000;
        margin-top: 10px;
        text-decoration: none;
      }
    }
    label {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 16px;
      color: #666;
    }
    .rate,
    .salary,
    .keywords,
    .title {
      font-size: 28px;
      border-bottom: 1px solid #aaa;
    }
    .state {
      display: flex;
    }
  }
  .publish {
    cursor: pointer;
    border: 0;
    margin-top: 40px;
    background: #1337ff;
    color: #fff;
    width: fit-content;
    padding: 0 50px;
    height: 80px;
    font-size: 24px;
    border-radius: 15px;
    line-height: 80px; 
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px 0px;
    &:hover {
      text-decoration: none;
      transform: scale(105%);
      transition: 0.125s ease;
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