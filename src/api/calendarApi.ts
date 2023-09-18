import axios from "axios";

import type { AxiosInstance } from "axios";
import type { CountryType, PublicHoliday } from "../types/calendar";

class CalendarApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://date.nager.at",
      timeout: 10000,
    });
  }

  getHolidaysForYear = async (
    year: number,
    countryCode: string,
  ): Promise<PublicHoliday[]> => {
    try {
      const { data } = await this.api.get(
        `/api/v3/PublicHolidays/${year}/${countryCode}`,
      );
      return data;
    } catch (err) {
      console.error("Error fetching holidays", err);
      return [];
    }
  };

  getCountries = async (): Promise<CountryType[]> => {
    try {
      const { data } = await this.api.get("/api/v3/AvailableCountries");
      return data;
    } catch (err) {
      console.error("Error fetching counries", err);
      return [];
    }
  };
}

export default CalendarApi;
