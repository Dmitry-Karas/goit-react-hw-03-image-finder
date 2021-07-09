import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-y: scroll;
  z-index: 1200;
`;

export const ModalWindow = styled.div`
  position: relative;
  width: 80vw;
  min-height: calc(100vh - 24px);
  margin: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  border: none;
  cursor: pointer;
  color: darkred;

  background-color: transparent;

  transition: transform 250ms ease-out;

  &:hover {
    transform: scale(1.4);
  }
`;
