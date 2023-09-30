import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_VnJJDFy8jUlv8V7N1Imc5BYtLuyHG0lMUT4496L0Lrxi4mw0C1j4fMnIbceMQjBB';

export const fetchBreeds = function (id) {
  if (!id) {
    return axios.get('https://api.thecatapi.com/v1/breeds')    
  } else {
    return axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
    );
  }
};
