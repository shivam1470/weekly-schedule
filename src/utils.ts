import moment from "moment";
// helper function to get the first three letters of a string
export const firstThreeLater = (str: string): string => str.slice(0, 3);

// working week days constant
export const weekdays: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

// morning hours constant
export const hourFrom8AMTo11AM: string[] = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
];

// afternoon hours constant
export const hourFrom12PMTo5PM: string[] = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

// evening hours constant
export const hourFrom7PMTo11PM: string[] = [
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
];

// helper function to convert hour state to target timezone
export const convertHourStateToTargetTimezone = (
  hourState: string[],
  targetTimezone: string
) => {
  const convertedHourState = hourState.map((hour) => {
    const hourInUTC = moment.tz(hour, "hh:mm A", "UTC");
    const hourInTargetTimezone = hourInUTC.clone().tz(targetTimezone);
    return hourInTargetTimezone.format("hh:mm A");
  });
  return convertedHourState;
};
