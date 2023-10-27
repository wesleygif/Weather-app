import axios from 'axios';

// const apiKey = '9acd543051e04bf7876da22bc61c97f8'; essa funciona e a key opriginal
const apiKey = '9acd543051e04bf7876da22bc61c97f';

// Função para buscar coordenadas de latitude e longitude com base no nome da localização
async function getLocationCoordinates(locationName) {
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&key=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.results[0].geometry;
  } catch (error) {
    throw error;
  }
}

export { getLocationCoordinates };
