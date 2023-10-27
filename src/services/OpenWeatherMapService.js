import axios from 'axios';

const apiKey = '9cf2f09e2d56379d7f86e1f72a25071a';
const apiUrl = 'https://api.openweathermap.org/data/3.0';

async function GetWeatherDataByCoordinates(lat, lon) {
  const endpoint = '/onecall';
  const params = {
    lat,
    lon,
    appid: apiKey,
  };

  try {
    const response = await axios.get(apiUrl + endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { GetWeatherDataByCoordinates };
