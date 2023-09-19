import React, { useState } from "react";
import { useDrop } from "react-dnd";
import TaskItem from "../Task/Task";
import { AddTaskButton, AddTaskInput, Day } from "../Calendar/styles";
import type { MoveFunction } from "../../types/ui.types";
import type { PublicHoliday, Task } from "../../types/calendar";

interface DayCellProps {
  day: number;
  fullDate: string;
  tasks: Task[];
  moveTask: MoveFunction;
  inactive: boolean;
  holiday?: PublicHoliday;
  addNewTask: (title: string, date: string) => void;
  handleEditTask: (taskId: number, newTitle: string) => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  fullDate,
  tasks,
  moveTask,
  inactive,
  addNewTask,
  holiday,
  handleEditTask,
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const [, ref] = useDrop({
    accept: "TASK",
    drop: () => ({ date: fullDate }),
  });

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      addNewTask(taskTitle, fullDate);
      setTaskTitle("");
      setIsAddingTask(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddTask();
  };

  const classNames = `calendar-day ${inactive ? "inactive-day" : ""} ${
    holiday ? "holiday-day" : ""
  }`;

  return (
    <Day ref={ref} className={classNames.trim()}>
      <p className='day-number'>{day}</p>
      {holiday && <span className='holiday-label'>{holiday.localName}</span>}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          moveTask={moveTask}
          editTask={handleEditTask}
        />
      ))}
      {isAddingTask ? (
        <AddTaskInput
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onBlur={handleAddTask}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        tasks.length <= 6 && (
          <AddTaskButton onClick={() => setIsAddingTask(true)}>+</AddTaskButton>
        )
      )}
    </Day>
  );
};

export default DayCell;
