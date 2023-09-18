import { RootState } from "../..";

export const getpublicHoliday = (state: RootState) => state.publicHoliday;

export const getCurrentCountry = (state: RootState) => state.countries.current;

export const getListCounrtries = (state: RootState) => state.countries.list;
