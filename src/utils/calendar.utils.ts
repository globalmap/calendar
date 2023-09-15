export const getDaysInMonth = (currentDate: Date) => {
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const daysInMonth: Date[] = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
    );
  }

  while (daysInMonth[0].getDay() !== 0) {
    daysInMonth.unshift(new Date(daysInMonth[0].getTime() - 86400000));
  }

  while (daysInMonth[daysInMonth.length - 1].getDay() !== 6) {
    daysInMonth.push(
      new Date(daysInMonth[daysInMonth.length - 1].getTime() + 86400000),
    );
  }

  return daysInMonth;
};
