'use strict';
const countriesCard = document.querySelector('.country-card');
const introBox = document.querySelector('.intro');
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
      console.log(data[0].name.common);
      const html = `
        <div class="population">
          Population: ${(+data[0].population/1000000).toFixed(1) + ' million'}
        </div>
        <div class="size">
          Country Land Size: ${Number(data[0].area).toLocaleString() + ' km²'}
        </div>
        <div class="continent">
          Continent: ${data[0].continents[0]}
        </div>
        <div class="capital">
          Capital City: ${data[0].capital[0]}
        </div>
        <div class="flag">
          <div class="flag-container">
            <img src="${data[0].flags.png}" alt="" style="height: 120px; width: 200px;">
          </div>
        </div>
      `;
      countriesCard.insertAdjacentHTML('beforeend', html);
      // countriesCard.style.opacity = 1;

    })
};

getRandomCountryWithData();

// const play = function () {
//   getRandomCountryWithData();
//   countriesCard.style.opacity = 1;
// };

// document.getElementById('play-btn').addEventListener('click', play);
