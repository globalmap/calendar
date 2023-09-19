import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { CalendarState } from "../../types/calendar.type";
import type {
  CountryType,
  LabelType,
  PublicHoliday,
  Task,
} from "../../../types/calendar";

const initialState: CalendarState = {
  countries: {
    list: [],
    current: {
      countryCode: "UA",
      name: "Ukraine",
    },
  },
  publicHoliday: [],
  tasks: [
    {
      id: 1,
      title: "Task 1",
      date: "2023-9-1",
      labels: [{ title: "Testing", color: "red" }],
    },
    {
      id: 2,
      title: "Task 2",
      date: "2023-9-19",
      labels: [
        { title: "New Testing", color: "red" },
        { title: "New Testing", color: "red" },
        { title: "New Testing", color: "red" },
        { title: "New Testing", color: "red" },
        { title: "New Testing", color: "red" },
        { title: "New Testing", color: "red" },
        { title: "New Testing", color: "red" },
        { title: "New Testing", color: "red" },
      ],
    },
  ],
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
    setTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, { ...action.payload, labels: [] }];
    },
    updateTask: (
      state,
      action: PayloadAction<{
        draggedId?: number;
        overId?: number;
        move?: {
          draggedTask: Task;
          targetDate: string;
        };
      }>,
    ) => {
      const { draggedId, overId, move } = action.payload;

      const tasks = state.tasks;

      if (move) {
        const { draggedTask, targetDate } = move;
        const updatedTasks = tasks.map((task) => {
          if (task.id === draggedTask.id) {
            return { ...task, date: targetDate };
          }
          return task;
        });
        state.tasks = updatedTasks;
      } else {
        const draggedTask = tasks.find((task) => task.id === draggedId)!;
        const overTask = tasks.find((task) => task.id === overId)!;
        const draggedIndex = tasks.indexOf(draggedTask);
        const overIndex = tasks.indexOf(overTask);

        const newTasks = [...tasks];
        newTasks.splice(draggedIndex, 1);
        newTasks.splice(overIndex, 0, draggedTask);

        state.tasks = newTasks;
      }
    },
    addLabelToTask: (
      state,
      action: PayloadAction<{ taskId: number; label: LabelType }>,
    ) => {
      const { taskId, label } = action.payload;

      const tasks = state.tasks;

      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            labels: [...task.labels, label],
          };
        }

        return task;
      });

      state.tasks = updatedTasks;
    },
  },
});

export const {
  setCountriesList,
  setPublicHoliday,
  setCountry,
  updateTask,
  setTask,
  addLabelToTask,
} = calendarSlice.actions;

export default calendarSlice.reducer;
