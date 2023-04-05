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

/* MainInterfaceWrapper
 *
 * A column flex wrapper that hosts the main page content.
 * Used once in Router.
 */
export const MainInterfaceWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  padding-bottom: 100px;
`;

/* EntryWrapper
 *
 * Highest level app component.
 * Provides global styling for headers and other global
 * classes used throughout the app and possibly the library.
 */
export const EntryWrapper = styled.div`
  background-size: 100% 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow: scroll;
  flex-grow: 1;
`;