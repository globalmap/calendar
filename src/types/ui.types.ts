import type { Task } from "./calendar";

export type MoveFunction = (a: {
  draggedId?: number;
  overId?: number;
  move?: {
    draggedTask: Task;
    targetDate: string;
  };
}) => void;
