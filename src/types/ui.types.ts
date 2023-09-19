import type { Task } from "./calendar";

export type MoveFunction = (params: {
  draggedId?: number;
  overId?: number;
  move?: {
    draggedTask: Task;
    targetDate: string;
  };
}) => void;
