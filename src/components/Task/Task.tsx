import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DragItem, Task } from "../../types/calendar";
import type { MoveFunction } from "../../types/ui.types";
import { TaskTitle, TaskWrapper } from "./style";
import Labels from "../Labels/Labels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faCheck } from "@fortawesome/free-solid-svg-icons";

interface TaskProps {
  task: Task;
  moveTask: MoveFunction;
  editTask: (taskId: number, newTitle: string) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, moveTask, editTask }) => {
  const { id, title, labels } = task;
  const [taskName, setTaskName] = useState(title);
  const [isEditing, setEditing] = useState(false);

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
        const dropResult: any = monitor.getDropResult();
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

  const handleStartEditing = () => setEditing(true);
  const handleFinishEditing = () => {
    editTask(id, taskName);
    setEditing(false);
  };

  return (
    <TaskWrapper
      ref={combineRefs(drag, drop)}
      style={{ opacity: isDragging ? 0 : 1 }}>
      <Labels items={labels} taskId={id} />
      <hr />
      <TaskTitle>
        <p>
          {!isEditing ? (
            <>{taskName} </>
          ) : (
            <input
              value={taskName}
              style={{ width: "35%" }}
              onChange={(e) => setTaskName(e.target.value)}
            />
          )}
          <FontAwesomeIcon
            icon={isEditing ? faCheck : faPencilSquare}
            style={{ cursor: "pointer" }}
            onClick={isEditing ? handleFinishEditing : handleStartEditing}
          />
        </p>
      </TaskTitle>
    </TaskWrapper>
  );
};

export default TaskItem;
