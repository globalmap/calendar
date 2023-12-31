import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setDataFromJSON } from "../../store/slices/Calendar/CalendarSlice";

function ImportCalendarButton() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const { result } = e.target!;

        try {
          const jsonData = JSON.parse(result as string);
          dispatch(setDataFromJSON(jsonData));
        } catch (error) {
          console.error("Error parsing JSON", error);
          alert(
            "There was an error processing your file. Please ensure it is a valid JSON file.",
          );
        }
      };

      reader.readAsText(file);
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type='file'
        hidden
        accept='.json'
        onChange={handleFileChange}
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Import Calendar
      </button>
    </div>
  );
}

export default ImportCalendarButton;
