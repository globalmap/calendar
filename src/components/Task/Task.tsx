import { useState } from "react";
import styled from "@emotion/styled";

const TaskWrapper = styled.div`
  /* Styling for Task */
`;

const Task: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState("");

  return (
    <TaskWrapper>
      {isEditing ? (
        <input
          value={taskText}
          onBlur={() => setIsEditing(false)}
          onChange={e => setTaskText(e.target.value)}
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{taskText}</span>
      )}
    </TaskWrapper>
  );
};

export default Task;
