const getMessageByTemp = (temp) => {
  if (temp >= 0 && temp < 14) {
    return "A freezing cold day!";
  }
  if (temp >= 15 && temp < 24) {
    return "A cold day!";
  }
  if (temp >= 25 && temp < 29) {
    return "A nice day for poker!";
  }
  if (temp >= 30 && temp < 34) {
    return "A warm day!";
  }
  if (temp >= 35) {
    return "A pretty hot day!";
  }
  return "Have a good day!";
};

export { getMessageByTemp };
export default getMessageByTemp;
