'use strict';
const countriesCard = document.querySelector('country-card');
const getRandomCountryWithData = function () {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(function (data) {
      const allCountries = [];
      data.forEach(country => allCountries.push(country.name.common));
      const country = allCountries[`${Math.floor(Math.random() * (250 - 0 + 1)) + 0}`];
      // console.log(country);
      // return allCountries[`${randomNum(0, 250)}`];
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => response.json())
    .then(function (data) {
      const result = {
      name: data[0].name.common,
      size: data[0].area,
      population: data[0].population,
      continent: data[0].continents[0],
      flag: data[0].flags.png
      };
      console.log(result);
      // return result;
    })
};
getRandomCountryWithData();
