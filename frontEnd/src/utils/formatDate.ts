export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatDateForInput(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
