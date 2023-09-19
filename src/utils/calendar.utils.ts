import { Task } from "../components/Calendar/Calendar";
import Task from "../components/Task/Task";
import { CalendarData, PublicHoliday } from "../types/calendar";

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDaysInMonth = (currentDate: Date) => {
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const daysInMonth: Date[] = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
    );
  }

  while (daysInMonth[0].getDay() !== 0) {
    daysInMonth.unshift(new Date(daysInMonth[0].getTime() - 86400000));
  }

  while (daysInMonth[daysInMonth.length - 1].getDay() !== 6) {
    daysInMonth.push(
      new Date(daysInMonth[daysInMonth.length - 1].getTime() + 86400000),
    );
  }

  return daysInMonth;
};

export const findHoliday = (date: Date, holidays: PublicHoliday[]) => {
  const matched = holidays.find((holiday) => {
    const holidayDate = new Date(holiday.date);
    const isMatch =
      holidayDate.getDate() === date.getDate() &&
      holidayDate.getMonth() === date.getMonth() &&
      holidayDate.getFullYear() === date.getFullYear();
    return isMatch;
  });
  return matched;
};

export const tasksForTheDay = (tasks: Task[], date: Date) => {
  return tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return (
      taskDate.getDate() === date.getDate() &&
      taskDate.getMonth() === date.getMonth() &&
      taskDate.getFullYear() === date.getFullYear()
    );
  });
};

export const exportToJsonFile = (calendarData: CalendarData) => {
  const dataStr = JSON.stringify(calendarData, null, 4);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "calendar_data.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};
