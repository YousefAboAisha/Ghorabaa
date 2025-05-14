export const dateConversion = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // for صباحًا/مساءً
  };

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("EN", options);

  return formattedDate;
};
