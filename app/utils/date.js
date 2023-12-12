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
  // Extract day, month, and year from the input number
  const i_day = Math.floor(inputNumber / 1000000);
  const i_month = Math.floor((inputNumber % 1000000) / 10000);
  const i_year = inputNumber % 10000;

  // Create a Date object from the extracted values
  const inputDate = new Date(`${i_year}-${i_month}-${i_day}`);

  // Calculate the time difference in milliseconds
  const timeDifference = Date.now() - inputDate.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the appropriate time unit and value
  if (timeDifference < day) {
    return `today`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}
