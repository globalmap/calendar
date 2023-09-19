import { useSelector } from "react-redux";
import {
  getpublicHoliday,
  getTasks,
} from "../../store/slices/Calendar/Calendar.selectors";
import { exportToJsonFile } from "../../utils/calendar.utils";
import ImportCalendarButton from "../ImportCalendarButton/ImportCalendarButton";
import { ButtonsContainer } from "./styles";

const Buttons = () => {
  const holidays = useSelector(getpublicHoliday);
  const tasks = useSelector(getTasks);

  return (
    <ButtonsContainer>
      <button onClick={() => exportToJsonFile({ holidays, tasks })}>
        Export Calendar
      </button>
      <ImportCalendarButton />
    </ButtonsContainer>
  );
};

export default Buttons;
