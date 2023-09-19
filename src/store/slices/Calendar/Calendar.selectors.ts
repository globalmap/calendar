import type { RootState } from "../..";

export const getpublicHoliday = (state: RootState) => state.publicHoliday;

export const getCurrentCountry = (state: RootState) => state.countries.current;

export const getListCounrtries = (state: RootState) => state.countries.list;

export const getTasks = (state: RootState) => state.tasks;
