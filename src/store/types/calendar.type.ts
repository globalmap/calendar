import { CountryType, PublicHoliday } from "../../types/calendar";

export interface CalendarState {
  publicHoliday: PublicHoliday[];
  countries: {
    list: CountryType[];
    current: CountryType;
  };
}
