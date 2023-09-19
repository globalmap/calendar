import { useSelector } from "react-redux";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import {
  getTasks,
  getpublicHoliday,
} from "./store/slices/Calendar/Calendar.selectors";
import { exportToJsonFile } from "./utils/calendar.utils";
import ImportCalendarButton from "./components/ImportCalendarButton/ImportCalendarButton";

function App() {
  const holidays = useSelector(getpublicHoliday);
  const tasks = useSelector(getTasks);
  return (
    <div>
      <button onClick={() => exportToJsonFile({ holidays, tasks })}>
        Export Calendar
      </button>
      <ImportCalendarButton />
      <Calendar />
      {/* <ModalWrap /> */}
    </div>
  );
}

export default App;
