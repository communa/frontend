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
    padding-bottom: 60px;
    
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

export const LoginPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  display: flex;
  flex-direction: row;
  padding: 60px;
  border-radius: 10px;
  overflow: hidden;
  
  .banner {
    padding: 0 60px;
    background-image: url('/login.webp');
    background-size: cover;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    height: calc(100vh - 120px);
    flex: 1;
  }
  .login {
    padding: 50px 60px 60px 70px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .main {
      h1 {
        line-height: 1;
        font-size: 36px;
        margin-bottom: 20px;
      }
      h2 {
        margin-bottom: 60px;
        font-size: 18px;
        font-weight: 400;
        line-height: 1.4;
      }
      button {
        padding: 0 50px;
        height: 80px;
        font-size: 23px;
        border-radius: 15px;
      }
    }
    .nav {
      gap: 20px;
      justify-content: left;
      display: flex;
      a {
        font-size: 18px;
        text-decoration: none;
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    padding: 20px;
    height: calc(100vh - 80px);

    .banner {
      display: none;
    }
    .login {
      padding: 20px;
    }
  }  
`;

export const LitePaperPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  display: flex;
  flex-direction: column;

  .banner {
    background-image: url('/litepaper.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 200px;
    flex: 1;
    color: #fff;
    flex-direction: column;
    padding: 60px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .middle {
      width: 1100px;

      h2 {
        font-size: 42px;
        margin-bottom: 10px;;
      }
      p {
        font-size: 18px;
      }
      ul {
        margin-left: 20px;
        margin-top: 20px;
      }
    }
  }
  article {
    justify-content: center;
    align-items: center;
    width: 1100px;
    padding: 0 60px 100px;
    margin: 0 auto;

    h2 {
      margin-top: 30px;
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
  @media only screen and (max-width: 700px) {
    overflow: hidden;

    header {
      padding: 20px;
    }
    .banner {
      margin-top: 10px;
      padding: 20px;
      margin-bottom: -20px;

      .middle {
        width: auto;
        h2 {
          font-size: 32px;
        }
        p {
          line-height: 1.3;
          font-size: 16px;
        }
      }
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

export const ActivityPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1100px;
  justify-content: center;
  margin: 0 auto;
  
  @media only screen and (max-width: 700px) {
    margin: initial;
    width: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
`;

export const UserPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1100px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  
  article {
    margin-top: 60px;
    text-align: left;
    width: 100%;
  }

  @media only screen and (max-width: 700px) {
    margin: 0 auto;
    width: auto;
    /* display: flex; */
    /* flex-direction: column; */
    padding: 20px;
    
    article {
      font-size: 16px;
    }
  }  
`;