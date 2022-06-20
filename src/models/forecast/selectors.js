const city = ({ forecast }) => forecast.city;
const temperature = ({ forecast }) => forecast.temperature;
const weather = ({ forecast }) => forecast.weather;

export { city, temperature, weather };
