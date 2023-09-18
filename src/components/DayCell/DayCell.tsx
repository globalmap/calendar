import React from "react";
import { useDrop } from "react-dnd";
import TaskItem from "../Task/Task";
import type { Task } from "../../types/calendar";

interface Props {
  date: Date;
  tasks: Task[];
  moveTask: (task: Task, date: Date) => void;
}

const DayCell: React.FC<Props> = ({ date, tasks, moveTask }) => {
  const [, ref] = useDrop({
    accept: "TASK",
    drop: () => ({ date }),
  });

  return (
    <td ref={ref}>
      {date.getDate()}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} moveTask={moveTask} date={date} />
          </li>
        ))}
      </ul>
    </td>
  );
};

export default DayCell;
