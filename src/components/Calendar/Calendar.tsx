import React, { useState } from "react";
import {
  CalendarContainer,
  CalendarHeader,
  Dates,
  Day,
  WeekOfDay,
} from "./styles";
import { getDaysInMonth } from "../../utils/calendar.utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1,
              ),
            )
          }>
          Previous
        </button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1,
              ),
            )
          }>
          Next
        </button>
      </CalendarHeader>
      <Dates>
        <thead>
          <tr>
            {daysOfWeek.map(day => (
              <WeekOfDay key={day}>{day}</WeekOfDay>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(Math.ceil(daysInMonth.length / 7))
            .fill(null)
            .map((_, weekIndex) => (
              <tr key={weekIndex}>
                {daysInMonth
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map(date => (
                    <Day
                      className={`${
                        date.getMonth() !== currentDate.getMonth()
                          ? "inactive-day"
                          : ""
                      }`}
                      key={date.toString()}>
                      {date.getDate()}
                    </Day>
                  ))}
              </tr>
            ))}
        </tbody>
      </Dates>
    </CalendarContainer>
  );
};

export default Calendar;
