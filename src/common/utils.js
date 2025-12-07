const formatDate = (date) => {
  return date.toDateString() + " " + date.toTimeString().substring(0, 8);
};

export { formatDate };
