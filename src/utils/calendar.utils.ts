import type { Task, PublicHoliday, CalendarData } from "../types/calendar";

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MILLISECONDS_IN_A_DAY = 86400000;

const areDatesEqual = (date1: Date, date2: Date): boolean =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const getDaysInMonth = (currentDate: Date): Date[] => {
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

  for (
    let date = new Date(startOfMonth.getTime() - MILLISECONDS_IN_A_DAY);
    date.getDay() !== 6;
    date = new Date(date.getTime() - MILLISECONDS_IN_A_DAY)
  ) {
    daysInMonth.unshift(date);
  }

  for (
    let date = new Date(endOfMonth.getTime() + MILLISECONDS_IN_A_DAY);
    date.getDay() !== 0;
    date = new Date(date.getTime() + MILLISECONDS_IN_A_DAY)
  ) {
    daysInMonth.push(date);
  }

  return daysInMonth;
};

export const findHoliday = (
  date: Date,
  holidays: PublicHoliday[],
): PublicHoliday | undefined =>
  holidays.find((holiday) => areDatesEqual(new Date(holiday.date), date));

export const tasksForTheDay = (tasks: Task[], date: Date): Task[] =>
  tasks.filter((task) => areDatesEqual(new Date(task.date), date));

export const exportToJsonFile = (calendarData: CalendarData): void => {
  const dataStr = JSON.stringify(calendarData, null, 4);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "calendar_data.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};
