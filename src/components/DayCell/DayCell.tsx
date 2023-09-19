import React from "react";
import { useDrop } from "react-dnd";
import TaskItem from "../Task/Task";
import type { Task } from "../../types/calendar";
import { Day, Tasks } from "../Calendar/styles";

type Props = {
  day: number;
  fullDate: string; // у форматі "yyyy-mm-dd"
  tasks: Task[];
  moveTask: (draggedTask: Task, targetDate: string) => void;
  inactive: boolean;
  addNewTask: (title: string, date: string) => void;
};

const DayCell: React.FC<Props> = ({
  fullDate,
  day,
  tasks,
  moveTask,
  inactive,
  addNewTask,
}) => {
  const [, ref] = useDrop({
    accept: "TASK",
    drop: () => ({ date: fullDate }),
  });

  return (
    <Day ref={ref} className={`calendar-day ${inactive ? "inactive-day" : ""}`}>
      <p
        onClick={() => {
          addNewTask("TASK 3", fullDate);
        }}
        style={{ cursor: "pointer" }}>
        {day}
      </p>
      <Tasks id='tasks'>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} moveTask={moveTask} />
        ))}
      </Tasks>
    </Day>
  );
};

export default DayCell;
