export function getSmallDate(now = new Date()) {
  var yyyy = now.getFullYear();
  var mm = now.getMonth() + 1; // getMonth() is zero-based
  var dd = now.getDate();
  return 1000000 * dd + 10000 * mm + yyyy;
}

export function isUnderThreshold(dateTime1, dateTime2, thresholdMinutes) {
  const thresholdMinutesInMillis = thresholdMinutes * 60 * 1000;
  const timeDifference = Math.abs(dateTime1 - dateTime2);
  return timeDifference <= thresholdMinutesInMillis;
}

export function humanizeTimeDuration(inputNumber) {
  const i_day = Math.floor(inputNumber / 1000000);
  const i_month = Math.floor((inputNumber % 1000000) / 10000);
  const i_year = inputNumber % 10000;

  const inputDate = new Date(`${i_year}-${i_month}-${i_day}`);

  const timeDifference = Date.now() - inputDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < day) {
    return `Today`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (timeDifference >= year) {
    const years = Math.floor(timeDifference / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else {
    return `Never`;
  }
}

export function daysBetweenDates(date1, date2) {
  const day1 = date1 / 1000000;
  const month1 = (date1 % 1000000) / 10000;
  const year1 = date1 % 10000;

  const day2 = date2 / 1000000;
  const month2 = (date2 % 1000000) / 10000;
  const year2 = date2 % 10000;

  const dateObj1 = new Date(year1, month1 - 1, day1);
  const dateObj2 = new Date(year2, month2 - 1, day2);

  const timeDifference = Math.abs(dateObj2 - dateObj1);

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
