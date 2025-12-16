const formatDate = (date) => {
  let dateObject = new Date(date);
  return (
    dateObject.toDateString() + " " + dateObject.toTimeString().substring(0, 8)
  );
};

const formatDateMMDDYYYY = (date) => {
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const arrayAverage = (array) => {
  return (
    array.reduce(
      (accumulator, currentValue) => accumulator + currentValue.rate,
      0
    ) / array.length
  );
};

export { arrayAverage, formatDate, formatDateMMDDYYYY };
