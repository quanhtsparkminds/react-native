import { format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";

export const formatTimestamp = (timestamp: string): string => {
  const date = parseISO(timestamp);
  if (isToday(date)) {
    return `Today, ${format(date, "h:mm a")}`;
  }
  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, "h:mm a")}`;
  }
  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mm a")}`;
  }
  return format(date, "MMM d, yyyy h:mm a");
};

export const formatAttendanceDate = (timestemp: string): string => {
  const date = parseISO(timestemp);

  if (isToday(date)) {
    return `Today, ${format(date, "HH:mm")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "HH:mm")}`;
  }

  return `${format(date, "MMM, dd")}`;
};
