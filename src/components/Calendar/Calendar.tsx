import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import html2canvas from "html2canvas";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CalendarContainer, CalendarHeader, Dates, WeekOfDay } from "./styles";
import DayCell from "../DayCell/DayCell";
import {
  daysOfWeek,
  findHoliday,
  getDaysInMonth,
} from "../../utils/calendar.utils";
import api from "../../api";
import {
  getCurrentCountry,
  getTasks,
} from "../../store/slices/Calendar/Calendar.selectors";
import {
  editTitleTask,
  setTask,
  updateTask,
} from "../../store/slices/Calendar/CalendarSlice";
import type { PublicHoliday } from "../../types/calendar";
import type { MoveFunction } from "../../types/ui.types";

// Calendar Component
const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<PublicHoliday[]>([]);

  const country = useSelector(getCurrentCountry);
  const fetchedHolidays = useFetch(
    api.calendar.getHolidaysForYear,
    currentDate.getFullYear(),
    country.countryCode,
  ).data;

  useEffect(() => {
    if (fetchedHolidays) {
      setHolidays(fetchedHolidays);
    }
  }, [fetchedHolidays]);

  const handleMonthChange = (increment: number) => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + increment, 1),
    );
  };

  const handleSaveAsImage = async () => {
    const calendarElement = document.getElementById("calendar");
    if (!calendarElement) return;

    try {
      const canvas = await html2canvas(calendarElement);
      const link = document.createElement("a");
      link.download = "calendar.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error saving calendar as image:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSaveAsImage}>Save Calendar as Image</button>
      <CalendarContainer id='calendar'>
        <Header currentDate={currentDate} onMonthChange={handleMonthChange} />
        <DateGrid currentDate={currentDate} holidays={holidays} />
      </CalendarContainer>
    </div>
  );
};

const Header: React.FC<{
  currentDate: Date;
  onMonthChange: (inc: number) => void;
}> = ({ currentDate, onMonthChange }) => (
  <CalendarHeader>
    <button onClick={() => onMonthChange(-1)}>Previous</button>
    <span>
      {currentDate.toLocaleString("default", { month: "long" })}{" "}
      {currentDate.getFullYear()}
    </span>
    <button onClick={() => onMonthChange(1)}>Next</button>
  </CalendarHeader>
);

const DateGrid: React.FC<{ currentDate: Date; holidays: PublicHoliday[] }> = ({
  currentDate,
  holidays,
}) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const weeks = Array(Math.ceil(daysInMonth.length / 7)).fill(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <Dates>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <WeekOfDay key={day}>{day}</WeekOfDay>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((_, weekIndex) => (
            <WeekRow
              key={weekIndex}
              days={daysInMonth.slice(weekIndex * 7, weekIndex * 7 + 7)}
              holidays={holidays}
              currentDate={currentDate}
            />
          ))}
        </tbody>
      </Dates>
    </DndProvider>
  );
};

const WeekRow: React.FC<{
  days: Date[];
  holidays: PublicHoliday[];
  currentDate: Date;
}> = ({ days, holidays, currentDate }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);

  const handleMoveTask: MoveFunction = (params) => dispatch(updateTask(params));
  const handleAddNewTask = (title: string, date: string) =>
    dispatch(setTask({ id: tasks.length + 1, title, date, labels: [] }));
  const handleEditTask = (taskId: number, newTitle: string) =>
    dispatch(editTitleTask({ id: taskId, newTitle }));

  return (
    <tr>
      {days.map((date) => {
        const holiday = findHoliday(date, holidays);
        const fullDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        const dayTasks = tasks.filter((t) => t.date === fullDate);

        return (
          <DayCell
            key={date.toString()}
            day={date.getDate()}
            fullDate={fullDate}
            tasks={dayTasks}
            moveTask={handleMoveTask}
            inactive={date.getMonth() !== currentDate.getMonth()}
            addNewTask={handleAddNewTask}
            handleEditTask={handleEditTask}
            holiday={holiday}
          />
        );
      })}
    </tr>
  );
};

export default Calendar;
