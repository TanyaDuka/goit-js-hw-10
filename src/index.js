import './css/styles.css';


import { Notify } from 'notiflix/build/notiflix-notify-aio';

import debounce from 'lodash.debounce';

import fetchCountries from '../src/fetchCountries.js'

const DEBOUNCE_DELAY = 300;



const textInput = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

textInput.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    let country = textInput.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (country) {
        fetchCountries(country)
            .then(countries => checkCountry(countries))
            .catch(() => { return Notify.failure('Oops, there is no country with that name') });
    }
}

function checkCountry(countries) {
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }else{renderCountry(countries);}
    
}

function renderCountry(countries) {
    
        countryList.innerHTML = countries.map(country => {
            return `<p><img src="${country.flags.svg}" alt="flag" width="20px"> ${country.name.official}</p>`
        }).join('');
    
    
    if (countries.length === 1) {
        const languages = Object.values(countries[0].languages).[0];
        const markupInfo = `<ul>
      <li>Capital: ${countries[0].capital[0]}</li>
      <li>Population: ${countries[0].population}</li>
      <li>Languages: ${languages}</li>
      </ul>`;

      countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
    }
    
}