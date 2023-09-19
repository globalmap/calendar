import React from "react";
import { useDrag } from "react-dnd";
import type { Task } from "../../types/calendar";

const type = "TASK";

type Props = {
  task: Task;
  moveTask: (draggedTask: Task, targetDate: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, moveTask }) => {
  const [, ref] = useDrag({
    type,
    item: task,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveTask(item, dropResult.date);
      }
    },
  });

  return <div ref={ref}>{task.title}</div>;
};

export default TaskItem;
