// components/utils/dateUtils.js
import { format, addDays, subDays, isToday, isSameDay, parseISO } from 'date-fns';

export function formatDate(date, formatStr = 'MMMM d, yyyy') {
  return format(parseISO(date), formatStr);
}

export function getNextDay(date) {
  return addDays(parseISO(date), 1);
}

export function getPrevDay(date) {
  return subDays(parseISO(date), 1);
}

export function checkIsToday(date) {
  return isToday(parseISO(date));
}

export function checkIsSameDay(date1, date2) {
  return isSameDay(parseISO(date1), parseISO(date2));
}

export function generateTimeSlots() {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    formattedTime: `${String(i).padStart(2, '0')}:00 - ${String(i + 1).padStart(2, '0')}:00`,
  }));
}

export function getCurrentDate() {
  return format(new Date(), 'yyyy-MM-dd');
}