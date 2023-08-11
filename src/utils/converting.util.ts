export const stringToTime = ({ val }: { val: string }) => {
  const numericVal = parseInt(val);
  const time: Date = new Date(0);
  time.setMinutes(numericVal);
  const hours: number = Math.floor(numericVal / 60); // Calculate hours
  const minutes: number = numericVal % 60; // Calculate remaining minutes

  const formattedTime: string = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:00`;

  return formattedTime;
};
