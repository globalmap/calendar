import styled from "@emotion/styled";

export const CountriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

export const Country = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8rem;
  width: min-content;
  align-items: center;
  cursor: pointer;

  & img {
    width: 64px;
  }
`;
