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
] as const;
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function getMonthName(monthNum: number) {
  return months[monthNum];
}
function getDayName(dayNum: number) {
  return days[dayNum];
}
export { getMonthName, getDayName };
