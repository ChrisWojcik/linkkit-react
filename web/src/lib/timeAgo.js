import isServer from '@/lib/isServer';

const timeAgo = (date) => {
  if (isServer()) {
    return undefined;
  }

  let systemDate = new Date(Date.parse(date));

  if (isNaN(systemDate.getTime())) {
    return undefined;
  }

  const userDate = new Date();

  if (navigator.userAgent.match(/MSIE\s([^;]*)/)) {
    systemDate = Date.parse(date.replace(/( \+)/, ' UTC$1'));
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
  const diff = Math.floor((userDate - systemDate) / 1000);

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
};

export default timeAgo;
