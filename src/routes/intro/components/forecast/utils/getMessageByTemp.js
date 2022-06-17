const getMessageByTemp = (temperature) => {
  if (temperature >= 0 && temperature < 14) {
    return "A freezing cold day!";
  }
  if (temperature >= 15 && temperature < 24) {
    return "A cold day!";
  }
  if (temperature >= 25 && temperature < 29) {
    return "A nice day for poker!";
  }
  if (temperature >= 30 && temperature < 34) {
    return "A warm day!";
  }
  if (temperature >= 35) {
    return "A pretty hot day!";
  }
  return "Have a good day!";
};

export { getMessageByTemp };
export default getMessageByTemp;
