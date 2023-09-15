import styled from "@emotion/styled";

export const ModalWrapContainer = styled.div`
  z-index: 9999;
  background-color: rgb(255 255 255 / 0.3);
  backdrop-filter: blur(10px);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
`;

export const ModalContainer = styled.div`
  background: #efefef;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 10px;
`;

export const ModalCloseButton = styled.div`
  position: absolute;
  right: 3rem;
  font-size: 1.8rem;
  cursor: pointer;
  font-weight: bold;
`;

export const ModalHeader = styled.div`
  margin-bottom: 0.5rem;
  border-bottom: 1px #000 solid;
  padding-bottom: 0.5rem;
`;

export const ModalTitle = styled.h1`
  font-size: 2.5rem;
`;

export const ModalSubtitle = styled.h3`
  font-size: 0.8rem;
  color: #656565;
  margin-top: 0.5rem;
`;

export const ModalContent = styled.div`
  height: calc(100vh - 21rem);
  overflow-y: auto;
`;
