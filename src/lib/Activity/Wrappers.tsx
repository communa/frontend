import styled from 'styled-components';

export const ActivityWrapper = styled.div`
  &.short {
    padding-bottom: 60px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 80px;
  }
  &.full {
    padding-bottom: 60px;
    border-bottom: 0;
    margin-bottom: 0;
  }
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
      color: #777;
      font-size: 16px;
    }
    > a {
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
      font-size: 12px;
      margin-top: 5px;
      gap: 5px;
      flex-wrap: wrap;
      display: flex;

      > span {
        background: #999;
        color: #fff;
        flex: none;
        height: 32px;
        border-radius: 16px;
        display: flex;
        padding: 0px 13px;
        align-items: center;
      }
    }
  }
  @media only screen and (max-width: 700px) {
    article {
      width: 100%;
      overflow: hidden;
      > a {
        font-size: 28px;
      }
      .body {
        padding: 10px 0 20px;
      }
    }
  }
`;