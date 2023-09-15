import calendarApi from "./calendarApi";

const calendarApiInstance = new calendarApi();

export default {
  calendar: calendarApiInstance,
};
