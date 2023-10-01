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
  background: #ddddddaa;
  text-align: center;
  border-radius: 12px;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 550px;
  border-radius: 50%;
  height: 550px;
  justify-content: center;

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
  .wallet {
    margin-top: 40px;
    color: #444;
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

        filter: blur(0.5px);
        cursor: pointer;
      }
      .tag-green-inner {
        opacity: 1;
        top: -20px;
        right: -50px;
        color: rgb(215, 219, 40);
        border: 1px solid rgb(215, 219, 40);
        border-color: linear-gradient(10deg, rgb(215, 219, 40) 0%, rgb(117, 168, 10) 100%);
      }
      .tag-orange-inner {
        top: -50px;
        left: -90px;
        color: rgb(255, 145, 68);
        border: 1px solid rgb(255, 145, 68);
        border-color: linear-gradient(rgba(255, 255, 255,1), rgba(255, 255, 255,1)) padding-box, linear-gradient(135deg, #E2660F 0%, #FF9144 100%) border-box;
      }
      .tag-blue-inner {
        bottom: 10px;
        left: 35px;
        color: rgb(9, 173, 225);
        border: 1px solid rgb(9, 173, 225);
      }
      .tag-purple-inner {
        bottom: 20px;
        right: 40px;
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
        font-size: 62px;
        text-align: center;
        letter-spacing: -0.02em;
      }
      h1 {
        line-height: 72px;
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
        gap: 15px;
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
        h5 {
          color: rgba(0,0,0,0.5);
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
        width: 1000px;
        > p {
            padding: 80px;
            font-size: 22px;
            font-style: italic;
          }
        h2 {
          margin-top: 100px;
        }
        .blueprint {
          display: flex;
          flex-direction: column;

          picture {
            position: relative;
          }
          .levitate {
              -webkit-animation-name: levitate;
              animation-name: levitate;
              -webkit-animation-duration: 3s;
              animation-duration: 3s;
              -webkit-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
              -webkit-animation-timing-function: ease-in-out;
              animation-timing-function: ease-in-out;
          }
          .dot-primary {
              background: #00b289;
              -webkit-box-shadow: 0 14px 26px -12px rgba(0,178,137,.42),0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(0,178,137,.2)!important;
              box-shadow: 0 14px 26px -12px rgba(0,178,137,.42),0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(0,178,137,.2)!important;
          }
          .dot-success {
              background: #2775ca;
              -webkit-box-shadow: 0 14px 26px -12px #2775ca,0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(6,214,160,.2)!important;
              box-shadow: 0 14px 26px -12px #2775ca,0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(6,214,160,.2)!important;
          }
          .dot-info {
              background: #f5ac37;
              -webkit-box-shadow: 0 14px 26px -12px #f5ac37,0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(3,155,229,.2)!important;
              box-shadow: 0 14px 26px -12px #f5ac37,0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(3,155,229,.2)!important;
          }
          .dot {
              position: absolute;
              height: 48px;
              width: 48px;
              border-radius: 50%;
              z-index: 1;
          }
          .text {
            text-align: left;
            
            h3 {
              padding-top: 60px;
              text-align: left;
              font-weight: 700;
              font-size: 36px;
              margin-bottom: 10px;
            }
          }
          .left,
          .right {
            display: flex;
            flex-direction: row;
            gap: 100px;
            position: relative;

            img {
              position: relative;
            }
          }
          .one {
            ul {
              position: absolute;
              list-style: none;
              color: #000;
              z-index: 1;
              left: 0;
              display: flex;
              gap: 2px;
              flex-direction: column;
              bottom: 40px;

              li {
                background: #108a00;
                color: #fff;
                padding: 7px 15px;
                -webkit-flex: none;
                -ms-flex: none;
                -webkit-flex: none;
                -ms-flex: none;
                -webkit-flex: none;
                -ms-flex: none;
                flex: none;
                border-radius: 28px;
                font-size: 13px;
                width: 150px;
                -webkit-box-shadow: 0 14px 26px -12px #d1d1d1,0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(6,214,160,.2)!important;
                box-shadow: 0 14px 16px -6px #d1d1d1,0 4px 13px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(6,214,160,.2)!important;
              }
            }
          }
          .two {
            .timetracking {
              position: absolute;
              z-index: 1;
              bottom: 40px;
              
              img {
                border-radius: 10px;
                -webkit-box-shadow: 0 14px 26px -12px #d1d1d1,0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(6,214,160,.2)!important;
                box-shadow: 0 14px -16px -12px #d1d1d1,0 4px 13px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(6,214,160,.2)!important;
              }
            }
          }
          .left {
            .bg {
              position: absolute;
              left: 0;
            }
            &.three {
              .bg {
                left: 1px;
              }
              .dot-6 {
                top: 15%;
                left: 2%;
                display: flex;
                justify-content: center;
                align-items: end;
              }
              .dot-5 {
                bottom: 22%;
                right: 5%;
                height: 54px;
                width: 54px;
              }
              .dot-3 {
                bottom: 10%;
                height: 32px;
                width: 32px;
                left: 15%;
              }
            }
          }
          .right {
            .bg {
              position: absolute;
              right: 0;
            } 
          }
        }
      }
      &#token {
        background: #f1f1f1c1;
        margin-top: 200px;
        width: 100vw;
        transform: skew(0deg,-3deg) translate(0,-45px);
        padding: 150px 0;
        justify-content: center;
        align-items: center;
        display: flex;

        .tokenContainer {
          width: 1100px;
          transform: skew(0deg,3deg) translate(0,45px);
          display: flex;
          flex-direction: row;
          .left {
            flex: 1;
            text-align: left;
            padding: 0 30px;
            padding-right: 100px;
            
            h5 {
              font-size: 22px;
            }
            p {
              color: #888;
              font-size: 14px;
            }
            * {
              text-align: left;
            }
          }
          .right {
            flex: 1;
            margin-top: -100px;
          }
        }
      }
      &#faq {
        height: auto;
        margin-bottom: 20px;
        width: 1000px;
        margin-top: 150px;
        justify-content: center;
        display: flex;

        .providers {
          margin-bottom: 150px;
          justify-content: center;
          .gallery {
            display: flex;
            gap: 50px;
            justify-content: center;
            margin-top: 40px;
            img {
              height: 60px;
              filter: grayscale(1);
              cursor: pointer;
              &:hover {
                filter: grayscale(0);
              }
            }
          }
        }

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

      section {
        padding: 0;

        &#index {
          width: auto;
          .logo {
            margin-top: 30px;
              margin-bottom: 10px;
          }
          h1 {
            font-size: 42px;
            line-height: 1.1;
          }
        }
        &#token {
          width: auto;
          flex-direction: column;
          .tokenContainer {
            width: auto;  
            flex-direction: column;
          }
        }
        &#howitworks {
          width: auto;
          .blueprint {
            .left,
            .right {
              flex-direction: column;
            }
          }
        }
        &#faq {
          width: auto;
        }
      }
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
      /* padding: 20px; */
      /* overflow: hidden; */
      > aside {
        display: none;
      }
      > article {
        margin: inherit;
        width: 100%;
        padding: 20px 0;
      }
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
    main {
      > article {
        margin: inherit;
        width: auto;
        padding: 20px;
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