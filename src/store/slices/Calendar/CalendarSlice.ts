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
  tasks: [],
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
    setDataFromJSON: (
      state,
      action: PayloadAction<{ tasks: Task[]; holidays: PublicHoliday[] }>,
    ) => {
      const { tasks, holidays } = action.payload;

      state.tasks = tasks;
      state.publicHoliday = holidays;
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
    editTitleTask: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>,
    ) => {
      const { id, newTitle } = action.payload;

      const tasks = state.tasks;

      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: newTitle,
          };
        }

        return task;
      });

      state.tasks = updatedTasks;
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
    editingLabelTask: (
      state,
      action: PayloadAction<{ taskId: number; updatelabel: LabelType }>,
    ) => {
      const { taskId, updatelabel } = action.payload;

      const tasks = state.tasks;

      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            labels: task.labels.map((label) => {
              if (label.id === updatelabel.id) {
                return {
                  ...label,
                  ...updatelabel,
                };
              }
              return label;
            }),
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
  editTitleTask,
  editingLabelTask,
  setDataFromJSON,
} = calendarSlice.actions;

export default calendarSlice.reducer;
