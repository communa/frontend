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

export const JobsPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  main {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 320px auto;
    
    > article {
      padding: 80px 100px;
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
        margin-bottom: 0;
        margin-top: 0;
      }
      h2 {
        margin-bottom: 5px;
        font-size: 36px;
        margin-bottom: 0;
        margin-top: 40px;
      }
      h3 {
        font-size: 18px;
        margin-top: 5px;
        margin-bottom: 2px;
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
      .noResults {
        color: #777;
        font-size: 18px;
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
      padding-top: 70px;
      /* overflow-x: hidden; */

      > article {
        margin: inherit;
        width: 100%;
        padding: 20px 0;
      }
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