import type { CountryType, PublicHoliday, Task } from "../../types/calendar";

export interface CalendarState {
  publicHoliday: PublicHoliday[];
  countries: {
    list: CountryType[];
    current: CountryType;
  };
  tasks: Task[];
}
