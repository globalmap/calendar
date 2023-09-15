import { useEffect } from "react";
import styled from "@emotion/styled";

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const Day = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
`;

const Calendar = () => {
  // Generate days. Let's consider a 30-day month for simplicity
  const days = Array(30)
    .fill(null)
    .map((_, index) => index + 1);

  return (
    <CalendarGrid>
      {days.map(day => (
        <Day key={day}>{day}</Day>
      ))}
    </CalendarGrid>
  );
};

export default Calendar;
