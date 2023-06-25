import styled from 'styled-components';

export const ActivityWrapper = styled.div`
  article {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 1100px;
    
    .date {
      color: #555;
    }
    >a {
      margin-bottom: 10px;
      font-size: 36px;
      display: flex;
      font-weight: 600;
      color: #000;
      text-decoration: none;
      line-height: 1.1;
      &:hover {
        text-decoration: underline;
      }
    }
    .apply {
      margin-top: 20px;
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
    .body {
      padding: 20px 0 20px;
      h1, h2, h3 {
        margin-top: 20px;
        margin-bottom: 5px;
      }
      ol,
      ul {
        margin-left: 20px;
        padding: 0;
      }
    }
    .info,
    .keywords {
      flex: 1;
      font-size: 14px;
      margin-top: 5px;
      gap: 5px;
      flex-wrap: wrap;
      display: flex;
      span {
        background: #1337ff;
        color: #fff;
        padding: 3px 5px;
        flex: none;
      }
    }
  }
  @media only screen and (max-width: 700px) {
    article {
      >a {
        font-size: 35px;
      }
      .body {
        padding: 10px 0 20px;
      }
    }
  }
`;