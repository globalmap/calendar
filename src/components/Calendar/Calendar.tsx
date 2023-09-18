import React, { useEffect, useState } from "react";
import {
  CalendarContainer,
  CalendarHeader,
  Dates,
  Day,
  Tasks,
  WeekOfDay,
} from "./styles";
import {
  daysOfWeek,
  findHoliday,
  getDaysInMonth,
  tasksForTheDay,
} from "../../utils/calendar.utils";
import useFetch from "../../hooks/useFetch";
import api from "../../api";
import { useSelector } from "react-redux";
import { getCurrentCountry } from "../../store/slices/Calendar/Calendar.selectors";
import type { PublicHoliday, Task } from "../../types/calendar";
import { DndProvider, useDrag, useDrop, DropResult } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<PublicHoliday[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const country = useSelector(getCurrentCountry);

  const { data } = useFetch(
    api.calendar.getHolidaysForYear,
    currentDate.getFullYear(),
    country.countryCode,
  );

  useEffect(() => {
    if (data) {
      setHolidays(data);
    }
  }, [data]);

  const changeMonth = (increment: number) => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + increment,
        1,
      ),
    );
  };

  return (
    <CalendarContainer>
      <Header currentDate={currentDate} changeMonth={changeMonth} />
      <DateGrid
        currentDate={currentDate}
        holidays={holidays}
        tasks={tasks}
        onAddTask={(title, description, date) => {
          const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            date,
          };
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }}
      />
    </CalendarContainer>
  );
};

const Header: React.FC<{
  currentDate: Date;
  changeMonth: (inc: number) => void;
}> = ({ currentDate, changeMonth }) => (
  <CalendarHeader>
    <button onClick={() => changeMonth(-1)}>Previous</button>
    <span>
      {currentDate.toLocaleString("default", { month: "long" })}{" "}
      {currentDate.getFullYear()}
    </span>
    <button onClick={() => changeMonth(1)}>Next</button>
  </CalendarHeader>
);

const DateGrid: React.FC<{
  currentDate: Date;
  holidays: PublicHoliday[];
  tasks: Task[];
  onAddTask: (title: string, description: string, date: Date) => void;
}> = ({ currentDate, holidays, tasks, onAddTask }) => {
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
              tasks={tasks}
              currentDate={currentDate}
              onAddTask={onAddTask}
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
  tasks: Task[];
  currentDate: Date;
  onAddTask: (title: string, description: string, date: Date) => void;
}> = ({ days, holidays, tasks, currentDate, onAddTask }) => {
  return (
    <tr>
      {days.map((date) => {
        const holiday = findHoliday(date, holidays);
        const dayTask = tasksForTheDay(tasks, date);

        return (
          <Day
            ref={drop}
            className={`calendar-day ${
              date.getMonth() !== currentDate.getMonth() ? "inactive-day" : ""
            } ${holiday ? "holiday-day" : ""}`}
            key={date.toString()}>
            <p
              onClick={() => {
                if (dayTask.length <= 6) {
                  onAddTask("test", "description", date);
                }
              }}
              style={{ cursor: "pointer" }}>
              {date.getDate()}
            </p>
            {holiday && (
              <span className='holiday-label'>{holiday.localName}</span>
            )}
            <Tasks>
              {dayTask.map((task) => (
                <li draggable ref={drag} onClick={() => null} key={task.id}>
                  {task.title}
                </li>
              ))}
            </Tasks>
          </Day>
        );
      })}
    </tr>
  );
};

export default Calendar;
