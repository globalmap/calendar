import styled from "@emotion/styled";

const FlexCenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BorderAndShadow = `
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const TableCell = `
  height: 40px;
  text-align: center;
  border: 1px solid #e0e0e0;
`;

export const CalendarContainer = styled(FlexCenteredContainer)`
  width: 80%;
  margin: 2rem auto;
  ${BorderAndShadow}
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background-color: #f7f7f7;
`;

export const Dates = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const WeekOfDay = styled.th`
  ${TableCell}
`;

export const Day = styled.td`
  ${TableCell}
  background-color: #e9e9e9;
  height: 13rem;

  &.inactive-day {
    background-color: #f9f9f9;
    color: #b0b0b0;
  }
`;
