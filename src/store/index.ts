import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/Calendar/CalendarSlice";

export const store = configureStore({
  reducer: calendarReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
