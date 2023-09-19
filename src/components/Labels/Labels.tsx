import { useState } from "react";
import type { LabelType } from "../../types/calendar";
import { LabelContainer, LabelWrapper } from "./styles";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  addLabelToTask,
  editingLabelTask,
} from "../../store/slices/Calendar/CalendarSlice";

const Labels = ({ items, taskId }: { items: LabelType[]; taskId: number }) => {
  const dispatch = useDispatch();

  const [isAdded, setIsAdded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newLabel, setNewLabel] = useState<LabelType>({
    id: -1,
    color: "#ff0000",
    title: "",
  });

  const handleLabelAction = () => {
    if (isAdded) {
      dispatch(addLabelToTask({ taskId, label: newLabel }));
      setIsAdded(false);
    } else if (editing) {
      dispatch(editingLabelTask({ taskId, updatelabel: newLabel }));
      setEditing(false);
    }
  };

  return (
    <LabelWrapper>
      {items.map((label) => (
        <LabelContainer
          onDoubleClick={() => {
            setNewLabel(label);
            setEditing(true);
          }}
          key={label.id}
          style={editing ? { display: "none" } : { background: label.color }}>
          <p>{label.title}</p>
        </LabelContainer>
      ))}
      <LabelContainer
        style={
          !isAdded && !editing
            ? { background: "#cacaca", cursor: "pointer" }
            : {}
        }>
        {isAdded || editing ? (
          <div
            style={{
              border: "solid 1px #cacaca",
              padding: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "80%",
            }}>
            <input
              style={{ width: "35%" }}
              value={newLabel.title}
              onChange={(e) =>
                setNewLabel((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              type='color'
              style={{
                width: "15%",
                background: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
              value={newLabel.color}
              onChange={(e) =>
                setNewLabel((prev) => ({ ...prev, color: e.target.value }))
              }
            />
            <FontAwesomeIcon
              icon={faCheck}
              style={{ cursor: "pointer", color: "black" }}
              onClick={handleLabelAction}
            />
          </div>
        ) : (
          <p onClick={() => setIsAdded(true)}>Add Label</p>
        )}
      </LabelContainer>
    </LabelWrapper>
  );
};

export default Labels;
