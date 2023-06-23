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
  /* align-items: center;
  justify-content: center; */
  height: 100vh;
  overflow: scroll;

  main {
    margin: 0 auto;
    width: 1100px;
    display: flex;
    flex-direction: column;
  }
`;

export const LoginPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  display: flex;
  flex-direction: row;
  padding: 60px;

  .banner {
    padding: 0 60px;
    background-image: url('/login.png');
    background-size: cover;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    height: calc(100vh - 120px);
    flex: 1;
  }
  .login {
    background: #eee;
    padding: 60px;
    flex: 1;
    h1 {
      margin-bottom: 20px;
      font-size: 36px;
    }
    h2 {
      margin-bottom: 40px;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.4;
    }
  }
`;

export const AboutPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  display: flex;
  flex-direction: column;

  .banner {
    background-image: url('/jo-wroten-_ocWTLxYhTU-unsplash.jpg');
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
`;


export const ActivityPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1100px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  
  article {
  }
`;