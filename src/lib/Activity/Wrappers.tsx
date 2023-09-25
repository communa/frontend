import styled from 'styled-components';

export const ActivityWrapper = styled.div`
  padding-bottom: 100px;

  nav {
    margin-bottom: 20px;
    gap: 10px;
    display: flex;
  }
  article {
    display: flex;
    flex-direction: column;
    
    .body {
      overflow: hidden;
    }
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
        background: #777;
        color: #fff;
        padding: 3px 5px;
        flex: none;
      }
    }
    &.short {
      margin-bottom: 30px;
    }
  }
  @media only screen and (max-width: 700px) {
    article {
      width: auto;
      >a {
        font-size: 28px;
      }
      .body {
        padding: 10px 0 20px;
      }
    }
  }
`;