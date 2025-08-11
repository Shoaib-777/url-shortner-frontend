export function Datefromatter(isoString) {
  const date = new Date(isoString);

  let day = date.getDate();
  let month = date.getMonth() + 1; 
  const year = date.getFullYear();

  // Extract time parts
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Format to 12-hour clock
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; 

  day = day.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  const minutesPadded = minutes.toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutesPadded} ${ampm}`;
}

