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
    a {
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
      color: #1337ff;
    }
    .body {
      padding: 20px 0 20px;
    }
    .keywords {
      flex: 1;
      color: #555;
      font-size: 16px;
      margin-top: 10px;
      span {
        margin-right: 10px;
      }
    }
  }
`;