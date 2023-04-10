import styled from 'styled-components';

export const ActivityWrapper = styled.div`
  article {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    
    .date {
      color: #555;
    }
    >a {
      margin-bottom: 10px;
      font-size: 40px;
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
      padding: 15px 20px;
      height: auto;
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
      margin-top: 10px;
      span {
        margin-right: 10px;
        background: #1337ff;
        color: #fff;
        padding: 3px 5px;
      }
    }
  }
`;