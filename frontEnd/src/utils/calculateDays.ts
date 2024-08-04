export function calculateDays(expiryDate: string) {
  const expDate = new Date(expiryDate);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffTime = expDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Expired";
  } else {
    return `${diffDays} days left`;
  }
}
