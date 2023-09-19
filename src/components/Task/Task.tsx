import React from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DragItem, Task } from "../../types/calendar";
import type { MoveFunction } from "../../types/ui.types";
import { TaskTitle, TaskWrapper } from "./style";
import Labels from "../Labels/Labels";

interface TaskProps {
  task: Task;
  moveTask: MoveFunction;
}

const TaskItem: React.FC<TaskProps> = ({ task, moveTask }) => {
  const originalIndex = task.id;

  const [, drop] = useDrop({
    accept: "TASK",
    canDrop: (item: DragItem) => item.id !== task.id,
    hover(draggedItem: DragItem) {
      if (draggedItem.id !== task.id) {
        moveTask({ draggedId: draggedItem.id, overId: task.id });
        draggedItem.originalIndex = originalIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { ...task, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveTask({ draggedId: droppedId, overId: originalIndex });
      } else {
        const dropResult = monitor.getDropResult();
        moveTask({
          move: {
            draggedTask: item,
            targetDate: dropResult.date,
          },
        });
      }
    },
  });

  const combineRefs =
    (...refs: any[]) =>
    (node: any) =>
      refs.forEach((ref) => ref(node));

  return (
    <TaskWrapper
      ref={combineRefs(drag, drop)}
      style={{ opacity: isDragging ? 0 : 1 }}>
      <Labels items={task.labels} />
      <hr />
      <TaskTitle>{task.title}</TaskTitle>
    </TaskWrapper>
  );
};

export default TaskItem;
