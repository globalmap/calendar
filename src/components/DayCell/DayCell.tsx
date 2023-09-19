import React, { useState } from "react";
import { useDrop } from "react-dnd";
import TaskItem from "../Task/Task";
import { AddTaskButton, AddTaskInput, Day } from "../Calendar/styles";
import type { MoveFunction } from "../../types/ui.types";
import type { PublicHoliday, Task } from "../../types/calendar";

interface Props {
  day: number;
  fullDate: string;
  tasks: Task[];
  moveTask: MoveFunction;
  inactive: boolean;
  holiday: PublicHoliday | undefined;
  addNewTask: (title: string, date: string) => void;
}

const DayCell: React.FC<Props> = ({
  fullDate,
  day,
  tasks,
  moveTask,
  inactive,
  addNewTask,
  holiday,
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

  return (
    <Day
      ref={ref}
      className={`calendar-day ${inactive ? "inactive-day" : ""} ${
        holiday ? "holiday-day" : ""
      }`}>
      <p>{day}</p>
      {holiday && <span className='holiday-label'>{holiday.localName}</span>}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} moveTask={moveTask} />
      ))}
      {isAddingTask ? (
        <AddTaskInput
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onBlur={handleAddTask}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          autoFocus
        />
      ) : (
        <>
          {tasks.length <= 6 && (
            <AddTaskButton onClick={() => setIsAddingTask(true)}>
              +
            </AddTaskButton>
          )}
        </>
      )}
    </Day>
  );
};

export default DayCell;
