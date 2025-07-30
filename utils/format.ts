export const fullDateConversion = (date: Date): string => {
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

export const arabicDateConversion = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("ar-EG", options);

  return formattedDate;
};

export const dateConversion = (date: Date): string => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }); // e.g., "Jan"
  const year = d.getFullYear();

  // Get ordinal suffix
  const getOrdinalSuffix = (n: number): string => {
    if (n >= 11 && n <= 13) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  return `${getOrdinalSuffix(day)} ${month} ${year}`;
};
