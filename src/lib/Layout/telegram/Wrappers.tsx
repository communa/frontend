import styled from 'styled-components';

export const TelegramWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  left: 0;
  right: 0;
  top: 0;
  height: var(--tg-viewport-stable-height, 100vh);
  flex-grow: 1;
  justify-content: space-between;

  main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    nav {
      &.bottom {
        display: flex;
        gap: 20px;

        button {
          flex: 1;
        }
      }
    }
  }

  &#loading {
    main {
      justify-content: center;
      align-items: center;

      .logo {
        animation: rotation 10s infinite linear;
        /* transform: rotate(360deg); */
      }
    }
  }
  &#welcome {
    main {
      justify-content: center;

      section {
        text-align: center;
        padding: 20px;
        margin-top: 20px;

        h2 {
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          color: #666;
        }
      }
      nav {
        margin-top: 30px;
        justify-content: center;
        display: flex;

        button {
          padding: 25px 20px;
        }
      }
    }
  }
  &#profile {
    justify-content: start;
    
    main {
      padding-top: 10px;

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
        padding: 0;
        flex: 4;
        font-size: 18px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: start;
      }      
    }
  }
  &#edit {
    main {
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .fields  {
        > div {
          margin-bottom: 20px;
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
      nav {
        padding: 0;
        display: flex;
        gap: 20px;

        button {
          flex: 1;
        }
      }
    }
  }
`;
