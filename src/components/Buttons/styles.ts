import styled from "@emotion/styled";

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  & button,
  & div {
    width: 25%;
    padding: 0.5rem;
  }

  & div button {
    width: 100%;
  }
`;
