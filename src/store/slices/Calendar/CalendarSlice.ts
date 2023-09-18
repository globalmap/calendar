import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { CalendarState } from "../../types/calendar.type";
import type { CountryType, PublicHoliday } from "../../../types/calendar";

const initialState: CalendarState = {
  countries: {
    list: [],
    current: {
      countryCode: "UA",
      name: "Ukraine",
    },
  },
  publicHoliday: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<CountryType>) => {
      state.countries.current = action.payload;
    },
    setCountriesList: (state, action: PayloadAction<CountryType[]>) => {
      state.countries.list = action.payload;
    },

    setPublicHoliday: (state, action: PayloadAction<PublicHoliday[]>) => {
      state.publicHoliday = action.payload;
    },
  },
});

export const { setCountriesList, setPublicHoliday, setCountry } =
  calendarSlice.actions;

export default calendarSlice.reducer;
