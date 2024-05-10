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

export const LoginPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;  
  align-items: center;
  background: #212529 !important;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
  height: 100vh;

  .close {
    position: absolute;
    right: 30px;
    top: 30px;

    svg {
      font-size: 40px;
      color: #eee;
    }
  }
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    height: 100%;
    justify-content: space-between;
    padding: 60px;

    section {
      padding: 0;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      header {
        a {
          color: #eee;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          text-decoration: underline;
          font-weight: 600;
        }
      }
      ul {
        text-align: left;
        flex-direction: row;
        display: inline-flex;
        text-align: center;
        gap: 50px;
        color: #fff;
        margin-top: 20px;
        
        li {
          margin-bottom: 30px;
          flex-direction: column;
          display: flex;

          button {
            min-width: 300px;
            justify-content: center;
            height: 60px;
            text-transform: initial;
            background: #ccc;
            color: rgba(var(--color-primary-main),1);

            span {
              margin-right: 5px !important;
            }
            &:disabled {
              opacity: 0.3;
              &:hover {
                opacity: 0.3; 
              }
            }
            &:hover {
              opacity: 1; 
              background: #eee;
            }
            svg {
              
            }
          }
          p {
            margin-top: 15px;
            color: #aaa;
          }          
        }
      }  
      .middleHeader {
        > span {
          background: #002fed1b;
          border-radius: 15px;
          padding-left: 12px;
          padding-right: 12px;
          padding-top: 4px;
          padding-bottom: 4px;

          display: inline-block;
          color: #504dfd;

          font-size: 14px;
          line-height: 20px;
          font-weight: 500;
        }
        p {
          max-width: 700px;
          font-size: 16px;
          font-style: italic;
          width: 700px;
          margin: 0 auto;
          line-height: 1.5;
          margin-bottom: 30px;
          font-style: italic;
        }
        h2 {
          text-align: center;
          margin: 10px 0 10px;
          font-style: normal;
          font-weight: 700;
          font-size: 36px;    
        }    

        &.__white {
          h2 {
            color: #fff;
          }
          p {
            color: #ccc;
          }
        }
      }
      .actionButton {
        background: linear-gradient(236.08deg, rgb(52, 60, 48) 12.34%, rgb(0, 0, 0) 86.37%);
        box-shadow: rgba(114, 89, 89, 0.1) 0px 4px 12px 0px;
        color: #fff;
        font-weight: 500;
        border-width: 0;

        font-size: 18px;
        border-radius: 12px;
        padding: 10px 30px;
        color: #fff;
        height: 54px;
        cursor: pointer;
        text-transform: inherit;
        transition: transform 0.125s ease;
        display: flex;
        align-items: center;
        
        &:hover {
          transform: scale(101%);
        }           
        svg {
          margin-right: 10px;
        }
      }          
      #ton-connect-button {
        button {
          border-radius: 10px;
          color: #000;
        }
      }      
    }
    .note {
      margin-top: 10px;
      max-width: 460px;
      color: #aaa;
      font-size: 12px;
    }          
  }

  @media only screen and (max-width: 700px) {
    width: auto; 
    
    main {
      padding: 20px;
      width: auto;

      section {
        padding: 20px;
        header {
          p {
            width: 90%;
          }
        }
        ul {
          flex-direction: column;
          gap: 20px;
          li {
            margin-bottom: 0;
          }
        }
      }
    }
    .note {
      width: 80%;
    }
    .close {
      right: 10px;
      top: 10px;
    }
  }    
`

export const AuthTimeTrackerWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;  
  align-items: center;
  background: #212529 !important;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
  height: 100vh;

  .close {
    position: absolute;
    right: 30px;
    top: 30px;

    svg {
      font-size: 40px;
      color: #eee;
    }
  }
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    height: 100%;
    justify-content: space-between;
    padding: 60px;

    header {
      margin-top: 30px;
    }
    section {
      padding: 0;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      ul {
        text-align: left;
        flex-direction: row;
        display: inline-flex;
        text-align: center;
        gap: 50px;
        color: #fff;
        margin-top: 20px;
        
        li {
          margin-bottom: 30px;
          flex-direction: column;
          display: flex;

          button {
            width: 200px;
            justify-content: center;
            height: 60px;
            text-transform: initial;
            background: #ccc;
            color: rgba(var(--color-primary-main),1);

            span {
              margin-right: 5px !important;
            }
            &:disabled {
              opacity: 0.3;
              &:hover {
                opacity: 0.3; 
              }
            }
            &:hover {
              opacity: 1; 
              background: #eee;
            }
          }
          p {
            margin-top: 15px;
            color: #aaa;
          }          
        }
      }  
    }
    .note {
      margin-top: 10px;
      max-width: 400px;
      color: #aaa;
      font-size: 12px;
    }          
    .middleHeader {
      margin-top: 0;
      
      > span {
        background: #002fed1b;
        border-radius: 15px;
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 4px;
        padding-bottom: 4px;
    
        display: inline-block;
        color: #504dfd;
    
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }
      p {
        max-width: 700px;
        font-size: 16px;
        font-style: italic;
        width: 700px;
        margin: 0 auto;
        line-height: 1.5;
        margin-bottom: 30px;
        font-style: italic;
        color: #ccc;
      }
      h2 {
        text-align: center;
        margin: 10px 0 10px;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;    
        color: #fff;
      }
    }
    .actionButton {
      background: linear-gradient(236.08deg, rgb(52, 60, 48) 12.34%, rgb(0, 0, 0) 86.37%);
      box-shadow: rgba(114, 89, 89, 0.1) 0px 4px 12px 0px;
      color: #fff;
      font-weight: 500;
      border-width: 0;
      font-size: 18px;
      border-radius: 35px;
      color: #fff;
      height: 62px;
      cursor: pointer;
      text-transform: inherit;
      transition: transform 0.125s ease;
      display: flex;
      align-items: center;
      width: 250px;
      justify-content: center;
      span {
        margin-right: 5px !important;
      }
      &:hover {
        transform: scale(101%);
      }      
    }
  }

  @media only screen and (max-width: 700px) {
    width: auto; 

    main {
      padding: 20px;
      width: auto;
      /* height: auto; */
      section {
        padding: 20px;
        header {
          p {
            width: 90%;
          }
        }
        ul {
          flex-direction: column;
          gap: 20px;
          li {
            margin-bottom: 0;
          }
        }
      }
    }
    .note {
      width: 80%;
    }
    .close {
      right: 10px;
      top: 10px;
    }
  }    
`

export const TimeReportWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;

  nav {
    display: flex;
    margin-bottom: 20px;
    align-items: center;

    #logo {
      cursor: pointer;

      picture {
        position: relative;
        margin-right: 50px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
    }
    .heading {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .action {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  main {
    padding: 40px;

    .activeMinutes {
      &.__1 {
        background: rgba(255, 98, 98, 0.5);
      }
      &.__2 {
        background: rgba(255, 155, 155, 0.5);
      }
      &.__3 {
        background: rgb(255, 196, 196, 0.5);
      }
      &.__4 {
        background: rgb(245, 255, 193, 0.5);
      }
      &.__5 {
        background: rgb(240, 255, 134, 0.5);
      }      
      &.__6 {
        background: rgb(239, 255, 65, 0.5);
      }
      &.__7 {
        background: rgb(246, 255, 13, 0.5);
      }
      &.__8 {
        background: rgb(216, 255, 200, 0.5);
      }
      &.__9 {
        background: rgb(179, 255, 151, 0.5);
      }
      &.__9 {
        background: rgb(130, 251, 91, 0.5);
      }    
      &.__10 {
        background: rgb(89, 241, 42, 0.5);
      }        
    }
    .note {
      margin-top: 30px;
    }
  }

  @media print {
    padding: 0;
    margin: 0;

    button {
      display: none;
    }
  }    
`

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
    background: #000;
    
    > article {
      border-radius: 25px;
      background: #fff;

      padding: 80px 100px;
      display: flex;
      flex-direction: column;
      flex: 1;

      nav {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 40px;
        justify-content: space-between;
        
        h1 {
          font-size: 36px;
          margin-bottom: 0;
          margin-top: 0;
        }
        p {
          display: flex;
          align-items: center;
          color: #444;
          gap: 20px;

          #activities {
            width: auto;
          }
        }
      }
    }
    table {
      .tooltip {
        cursor: pointer;
        span {
          display: flex;
          gap: 5px;
          align-items: center;
          svg {
            font-size: 14px;
          }
        }
      }
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #5586d1;
      }
      .full {
        padding: 20px 0 50px 60px;
        margin-right: -12px;

        .top {
          display: flex;
          justify-content: space-between;
        }
        .actions {
          display: flex;
          gap: 30px;
          align-items: center;
        }
      }
    }
  }
  .activeMinutes {
    &.__1 {
      background: rgba(255, 98, 98, 0.5);
    }
    &.__2 {
      background: rgba(255, 155, 155, 0.5);
    }
    &.__3 {
      background: rgb(255, 196, 196, 0.5);
    }
    &.__4 {
      background: rgb(245, 255, 193, 0.5);
    }
    &.__5 {
      background: rgb(240, 255, 134, 0.5);
    }      
    &.__6 {
      background: rgb(239, 255, 65, 0.5);
    }
    &.__7 {
      background: rgb(246, 255, 13, 0.5);
    }
    &.__8 {
      background: rgb(216, 255, 200, 0.5);
    }
    &.__9 {
      background: rgb(179, 255, 151, 0.5);
    }
    &.__9 {
      background: rgb(130, 251, 91, 0.5);
    }    
    &.__10 {
      background: rgb(89, 241, 42, 0.5);
    }        
  }

  @media only screen and (max-width: 700px) {
    main {
      margin: 0 auto;
      width: calc(100vw);
      display: flex;
      flex-direction: column;
      padding: 0;

      header {
        padding: 10px;
      }

      > article {
        margin: inherit;
        width: 100%;
        padding: 20px;
        nav {
          h1 {
            font-size: 24px;
          }
        }
      }
    }
  }  
`

export const LoginWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  main {
    display: flex;
    height: 100vh;

    .login {
      flex: 1;
      padding: 60px;

      h2 {
        font-size: 40px;
      }
    }
    .banner {
      flex: 1;
      background: #2a14a6;
      border-radius: 35px;
      margin: 60px;
    }
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: #000;

  main {
    display: flex;
    min-height: 100vh;
    flex-direction: column; 
    
    > article {
      border-radius: 25px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: #fff;
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
          margin-bottom: 0;
          a {
            color: #666;
          }
        }
      }
      .noResults {
        color: #fff;
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
      width: calc(100vw);
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
      padding-bottom: 0;

      header {
        padding: 10px;
      }

      nav.actions {
        flex-direction: column;
        align-items: start;
        margin-bottom: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        
        h2 {
          font-size: 24px;
          margin-bottom: 2px;
        }
      }
    
      > article {
        margin: inherit;
        width: auto;
        padding: 20px;
      }
    }
  }
`;

export const UserPageWrapper = styled.div`
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
  .userProfile {
    display: flex;
    margin-top: 60px;
    margin-bottom: 100px;
    
    &.__edit {
      margin-top: 20px;
    }

    .fields {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-right: 100px;
      font-size: 20px;

      h3 {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #555;

        &:first-of-type {
          margin-top: 0;
        }
      }
      > p {
        font-weight: 600;
      }
      a {
        color: #1976d2;
        font-weight: 600;
      }
      .social {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        p {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          svg {
            margin-right: 10px;
            color: #555;
          }
        }
      }
    }
    .bio {
      flex: 1;
      background: #eee;
      padding: 40px;
      border-radius: 50px;

      h3 {
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    nav {
      flex-direction: column;
      align-items: baseline !important;
      margin-bottom: 0;

      h2 {
        display: none;
      }
    }
    h2 {
      font-size: 18px;
    }

    .userProfile {
      margin-top: 0;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      padding-right: 0;

      .fields {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-right: 0;

        p {
          font-size: 18px;
        }
        h3 {
          font-size: 16px;

          &:first-of-type {
            margin-top: 0;
          }
        }
        a {
          color: #1976d2;
          text-decoration: underline;
        }
        p {
          max-width: calc(100vw - 70px);
          overflow: hidden;
        }
        .social {
          margin-top: 20px;
        }        
      }
      .bio {
        margin-top: 20px;
      }
    }
  }    
`;