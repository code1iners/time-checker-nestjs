/**
 * Convert timestamp data to formatted data.
 * @param value
 * @returns {string}
 */
export const withDateFormat = (value: number) => {
  const date = new Date(value);
  const formatted = new Intl.DateTimeFormat("ko-kr", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return formatted;
};
