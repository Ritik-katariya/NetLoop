// Function to format time in "hh:mm AM/PM"
export const formatTime = (time) => {
  const date = new Date(time);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};