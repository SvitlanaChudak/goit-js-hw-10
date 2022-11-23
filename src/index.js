import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce((onInput), DEBOUNCE_DELAY));

function onInput(event) {
    let inputText = event.target.value.trim();

    if (inputText)
        return fetchCountries(inputText)
            .then(data => {
                if (data.length === 1) {
                    countryInfo.innerHTML = '';
                    return markupCountry(data)
                }
                if (data.length >= 2 && data.length <= 10) {
                    countryList.innerHTML = '';
                    return markupCountryList(data)
                }
                return Notify.info('Too many matches found. Please enter a more specific name.');
            })
            .catch(error => {
                Notify.failure('Oops, there is no country with that name');
            });
    
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
}

function markupCountry(data) {
    const markup = data.map(item => {
    return `<h1><img src="${item.flags.svg}" alt="${item.name.official}" height="40" /> ${item.name.official}</h1>
      <ul class="country-info_list">
        <li class="country-info_item"><h2>Capital:</h2><p>${item.capital}</p></li>
        <li class="country-info_item"><h2>Population:</h2><p>${item.population}</p></li>
        <li class="country-info_item"><h2>Languages:</h2><p>${Object.values(item.languages).join(', ')}</p></li>
      </ul>`
    }).join('');
    countryInfo.innerHTML = markup;
}

function markupCountryList(data) {
    const markup = data.map(item => {
    return `<li class="country-item"><img src="${item.flags.svg}" alt="${item.name.official}" height="40" />
    <p>${item.name.official}</p></li>`;
    }).join('');
    countryList.innerHTML = markup;
}

