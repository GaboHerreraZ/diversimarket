export const getDaysByMonth = (
  month: number,
  year: number = new Date().getFullYear()
) => {
  const daysQuantity = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysQuantity }, (_, i) => ({
    id: `${i + 1}`,
    description: `${i + 1}`,
    name: `${i + 1}`,
  }));
  return days;
};
