import {OPEN_WEATHER_API_KEY} from '../common/constants';

export const meApiGet = () => `https://randomuser.me/api/`;
export const weather2_5Get = (latitude, longitude) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
