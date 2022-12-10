import { isServer } from './isServer';

export function timeAgo(date: string | Date): string | undefined {
  if (isServer()) {
    return undefined;
  }

  let systemDate = typeof date === 'string' ? new Date(Date.parse(date)) : date;

  if (isNaN(systemDate.getTime())) {
    return undefined;
  }

  const userDate = new Date();

  if (navigator.userAgent.match(/MSIE\s([^;]*)/) && typeof date === 'string') {
    systemDate = new Date(Date.parse(date.replace(/( \+)/, ' UTC$1')));
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const diff = Math.floor((userDate.getTime() - systemDate.getTime()) / 1000);

  if (diff <= 0) {
    return 'just now';
  }
  if (diff < 60) {
    return diff + 's';
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + 'm';
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + 'h';
  }

  if (userDate.getFullYear() === systemDate.getFullYear()) {
    return `${months[systemDate.getMonth()]} ${systemDate.getDate()}`;
  } else {
    return `${
      months[systemDate.getMonth()]
    } ${systemDate.getDate()}, ${systemDate.getFullYear()}`;
  }
}
