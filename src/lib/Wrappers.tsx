import styled from 'styled-components';

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

export const TimePageWrapper = styled.div`
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
      flex: 1;

      nav {
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        
        h1 {
          font-size: 42px;
          margin-bottom: 0;
          margin-top: 0;
        }
        #activities {
          width: auto;
          margin-left: 50px;
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
      padding-top: 70px;
      /* overflow-x: hidden; */

      > article {
        margin: inherit;
        width: 100%;
        padding: 20px 0;
        nav {
          h1 {
            font-size: 24px;
          }
        }
      }
    }
  }  
`

export const PageWrapper = styled.div`
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
      flex: 1;

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
        align-items: center;
        h2 {
          margin-top: 0;
        }

        &.actions {
          justify-content: space-between;
        }
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
    &#jobNew {
      .projectType {
        > div {
          padding: 50px;
          border-radius: 20px;
          margin-top: 20px;
          background: #eee;
          
          &.personal {
            cursor: pointer;
            &:hover {
              background: #ddd;
            }
          }
          &.contract {
            opacity: 0.6;z
            p {
              color: #777;
            }
          }
          p {
            color: #000;
            font-size: 26px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;            
          }
        }
      }
    }
    &#jobPeronal,
    &#jobContract,
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
            margin-bottom: 10px;
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
    &#timesheets {
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
      flex: 1;
      
      h3 {
        margin-top: 20px;
        font-size: 18px;
      }
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        
        h2 {
          font-size: 22px;
        }
      }      
    }
  }
`;