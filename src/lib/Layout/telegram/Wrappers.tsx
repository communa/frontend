import styled from 'styled-components';

export const TelegramWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  left: 0;
  right: 0;
  top: 0;
  height: var(--tg-viewport-stable-height);
  overflow: hidden;
  flex-grow: 1;
  justify-content: space-between;

  main {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    nav {
      &.bottom {
        display: flex;
        gap: 10px;

        button {
          flex: 1;

          &.edit {
            flex: 3;
          }
          &.save {
            flex: 3;
          }
        }
      }
    }
  }
  &#welcome {
    main {
      justify-content: space-between;

      section {
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        flex: 1;        

        h2 {
          margin-bottom: 10px;
          margin-top: 10px;
        }
        p {
          font-size: 14px;
          color: #666;
        }
      }
      nav {
        margin-top: 60px;
        justify-content: center;
        display: flex;

        button {
          padding: 25px 20px;
        }
      }
      picture {
        display: flex;
        justify-content: center;
      }
    }
    footer {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      button {
        display: flex;
      }
      #authTon {
        display: flex;
        flex: 1;
      }
    }    
  }
  &#wizard {
    main {
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;

      .fields {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        > div {
          margin-bottom: 20px;
        }
      }

      footer {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        
        button {
          display: flex;
          flex: 1;
        }
      }    
    }
  }
  &#loading {
    height: 100vh;
    overflow: hidden;
    
    main {
      justify-content: center;
      align-items: center;

      .logo {
        animation: rotation 10s infinite linear;
      }
    }
  }
  &#about {
    overflow: scroll;

    main {
      height: auto;
      justify-content: center; 
      padding-bottom: 0;

      .logo {
        img {
          height: 100px;
          width: 100px;
        }
        margin-bottom: 15px;
      }
      h2 {
        text-align: center;
        font-size: 20px;
      }
      article {
        padding: 10px 0;
        text-align: justify;
      }
    }  
    footer {
      padding: 10px;
      display: flex;

      button {
        flex: 1;
      }
    }
  }
  &#profile {
    justify-content: start;

    &.inactive {
      main {
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 40px;
          text-align: center;
          h2 {
            font-size: 26px;
            margin-bottom: 10px;
          }
          p {
            font-size: 16px;
            color: #666;
          }
        }
      }
    }
    
    main {
      padding: 10px;

      header {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        line-height: 1.3;
        padding: 0 20px;
        flex: 1;
      
        .username {
          font-size: 40px;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 0px;
          color: #000;
        }
        .company {
          font-size: 22px;
          margin-top: 8px;
          color: #444;
          font-weight: 500;
        }      
      }
      .tags {
        margin-top: 10px;
        text-align: center;
        > div {
          margin: 2px 2px;
          h6 {
            color: #333;
            font-size: 14px;
          }
        }
      }
      .price {
        font-size: 36px;
        font-weight: 700;
        text-align: center;
        flex: 3;

        display: flex;
        justify-content: center;
        align-items: center;
        color: #0274ad;

        img {
          margin-right: 10px;
        }      
      }
      .bio {
        color: #444;
        padding: 0px;
        flex: 4 1 0%;
        font-size: 18px;
        display: flex;
        text-align: center;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: start;
        align-items: start;
        padding: 25px;
        padding-top: 0;
      }      
    }
  }
  &#edit {
    /* height: 80vh; */
    overflow: scroll;
    
    main {
      padding: 0;
      height: auto;
      overflow: scroll;
      min-height: 100%;
      
      .fields  {
        padding: 10px;
        padding-bottom: 80px;

        .MuiInput-root {
          margin-bottom: 10px;

          ::before {
            border-bottom: 1px solid rgb(150 150 150 / 40%);
          }
        }
        label {
          color: #999;
        }
        .country {
          margin-bottom: 0;
          margin-top: 0;

          label {
            margin-left: -15px;
            margin-top: 7px;
          }
        }
      }
      textarea {
        height: 100%;
      }
      > div {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    }
    footer {
      z-index: 10;
      background: #fff;
      padding: 10px;
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      nav {
        display: flex;
        gap: 10px;

        button {
          flex: 1;

          &.save {
            flex: 4;
          }
        }
      }    
    }
  }
`;
