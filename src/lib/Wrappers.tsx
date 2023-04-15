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
  }
  @media only screen and (max-width: 700px) {
    main {
      height: calc(100vh - 40px);
      padding: 20px;
    }
  }
`;

export const ActivityPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 60px;

  @media only screen and (max-width: 700px) {
    padding: 20px;
  }
`;