const formatDate = (date) => {
  let dateObject = new Date(date);
  return (
    dateObject.toDateString() + " " + dateObject.toTimeString().substring(0, 8)
  );
};

export { formatDate };
