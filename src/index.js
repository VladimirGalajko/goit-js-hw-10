import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_VnJJDFy8jUlv8V7N1Imc5BYtLuyHG0lMUT4496L0Lrxi4mw0C1j4fMnIbceMQjBB';
import { fetchBreeds } from './cat-api.js';

const refs = {
  choice: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
  wait: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.choice.addEventListener('change', handleSearch);

function handleSearch(e) {
  if (e) {
    const promisId = fetchBreeds(e.target.value);
    refs.wait.style.display = 'block';
    refs.info.style.display = 'none';
    promisId
      .then(response => {
        refs.choice.removeAttribute('hidden');
        refs.info.innerHTML = createMarkup(response.data);
        refs.info.style.display = 'flex';
        refs.wait.style.display = 'none';
      })
      .catch(err => {
        throwAnError(err);
      });
  }
}

const promis = fetchBreeds();
promis
  .then(response => {
    let optionsHTML = response.data
      .map(item => `<option value="${item.id}">${item.name}</option>`)
      .join('');
    refs.choice.insertAdjacentHTML('beforeend', optionsHTML);
    new SlimSelect({ select: '#selectElement' });
    refs.wait.style.display = 'none';
  })
  .catch(err => {
    throwAnError(err);
  });

function createMarkup(arr) {
  return arr[0].breeds
    .map(
      el => `     
      <img  src="${arr[0].url}" alt="${el.name}" class="info-img">
        <div class="info"> 
        <h1 class="cat-info-name">${el.name}</h1>
        <p class="cat-info-text">${el.description}</p>
        <p class="cat-info-temperament"><strong>Temperament:</strong> ${el.temperament}</p>
        </div>     
      `
    )
    .join('');
}

function throwAnError(err) {
  Notify.failure(`Ошибка ${err.message}`, {
    position: 'left-top',
    className: 'notify-warning',
  });
  refs.wait.style.display = 'none';
  refs.error.removeAttribute('hidden');
}
