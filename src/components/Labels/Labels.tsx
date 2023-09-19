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

  const handleAddingLabel = () => {
    dispatch(addLabelToTask({ taskId, label: newLabel }));
    setIsAdded(false);
  };
  const handleEditingLabel = () => {
    dispatch(editingLabelTask({ taskId, updatelabel: newLabel }));
    setEditing(false);
  };

  return (
    <LabelWrapper>
      {items.map((label, index) => (
        <LabelContainer
          onDoubleClick={(e) => {
            setNewLabel({
              id: label.id,
              title: label.title,
              color: label.color,
            });
            setEditing(true);
          }}
          key={index}
          style={
            editing
              ? { display: "none" }
              : { display: "block", background: label.color }
          }>
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
              onChange={(e) => {
                setNewLabel({
                  ...newLabel,
                  title: e.target.value,
                });
              }}
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
              onChange={(e) => {
                setNewLabel({
                  ...newLabel,
                  color: e.target.value,
                });
              }}
              id='color-picker'
            />
            <FontAwesomeIcon
              icon={faCheck}
              style={{ cursor: "pointer", color: "black" }}
              onClick={() => {
                if (isAdded) {
                  handleAddingLabel();
                }
                if (editing) {
                  handleEditingLabel();
                }
              }}
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
