import styled from 'styled-components';

/* BodyInterfaceWrapper
 *
 * An element that houses SideInterface and MainInterface.
 * Used once in Router.
 */
export const BodyInterfaceWrapper = styled.div`
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

export const HomePageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;

  main {
    height: calc(100vh - 120px);
    overflow: scroll;

    display: flex;
    flex-direction: column;
    padding: 60px;

    article {
      margin-bottom: 20px;
      
      a {
        margin-bottom: 10px;
        font-size: 40px;
        display: flex;
        font-weight: 600;
        color: #000;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      .body {
        padding: 20px 0;
      }
    }
  }
`;

export const ActivityPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 60px;
  
  article {
    margin-top: 20px;
    h1 {
      margin-top: 5px;
      font-size: 30px;
    }
    h2 {
      margin-top: 5px;
      font-size: 20px;
    }
    .body {
      padding: 20px 0;
    }
  }
`;