import React from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DragItem, Task } from "../../types/calendar";
import type { MoveFunction } from "../../types/ui.types";

const type = "TASK";

const TaskItem: React.FC<{
  task: Task;
  moveTask: MoveFunction;
}> = ({ task, moveTask }) => {
  const originalIndex = task.id;

  const [, drop] = useDrop({
    accept: "TASK",
    canDrop: (item: DragItem) => item.id !== task.id,
    hover(draggedItem: DragItem) {
      if (draggedItem.id !== task.id) {
        // moveTask(draggedItem.id, task.id);
        moveTask({ draggedId: draggedItem.id, overId: task.id });
        draggedItem.originalIndex = originalIndex;
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "TASK",
    item: { ...task, originalIndex },
    collect: (monitor: any) => ({
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

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      {task.title}
    </div>
  );
};

export default TaskItem;
