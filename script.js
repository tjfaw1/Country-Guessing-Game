'use strict';
const countriesCard = document.querySelector('.country-card');
const introBox = document.querySelector('.intro');
const guess = document.querySelector('.guess-bar').value;
const message = document.querySelector('.results').textContent;

let randomCountry = [];
const getRandomCountryAndDataFromApi = function () {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(function (data) {
      const allCountries = [];
      data.forEach(country => allCountries.push(country.name.common));
      const country = allCountries[`${Math.floor(Math.random() * (250 - 0 + 1)) + 0}`];
      console.log(country);
      // return allCountries[`${randomNum(0, 250)}`];
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => response.json())
    .then(function (data) {
      randomCountry.push(data[0].name.common);
      randomCountry.push((+data[0].population/1000000).toFixed(2) + ' million');
      randomCountry.push(Number(data[0].area).toLocaleString() + ' km²');
      randomCountry.push(data[0].continents[0]);
      randomCountry.push(data[0].capital[0]);
      randomCountry.push(data[0].capital[0]);
      const html = `
        <div class="population" id="country-snippet1">
          Population: ${(+data[0].population/1000000).toFixed(2) + ' million'}
        </div>
        <div class="size" id="country-snippet2">
          Land Size: ${Number(data[0].area).toLocaleString() + ' km²'}
        </div>
        <div class="continent" id="country-snippet3">
          Continent: ${data[0].continents[0]}
        </div>
        <div class="capital" id="country-snippet4">
          Capital City: ${data[0].capital[0]}
        </div>
        <div class="flag" id="country-snippet5">
          <div class="flag-container">
            <img src="${data[0].flags.png}" alt="" style="height: 120px; width: 200px; border: 1px solid black;">
          </div>
        </div>
      `;
      countriesCard.insertAdjacentHTML('beforeend', html);
      // document.querySelector('.results').style.opacity = 1;
    })
};

getRandomCountryAndDataFromApi();

// const play = function () {
//   getRandomCountryWithData();
//   countriesCard.style.opacity = 1;
// };

// document.getElementById('play-btn').addEventListener('click', play);

let score = 5;
let highScore = 0;
let count = 0;

const play = function() {
  getRandomCountryAndDataFromApi;
};




document.querySelector('.guess-bar').addEventListener('change', function () {
  const guess = this.value;
  if (guess == randomCountry) {
    document.querySelector('.results').style.opacity = 1;
    document.querySelector('.results').textContent = `Correct Guess! You got it in ${score} hits`;
    document.querySelector('.results').style.backgroundColor = '#60b347';
    document.querySelector('.results').style.color = 'white';
    document.querySelector('.results').style.fontSize = 'larger';
    document.querySelector('.results').style.fontWeight = 'bolder';

    if(score > highScore){
      highScore = score;
      document.querySelector('#high-score').textContent = `High Score: ${highScore}`;
    }

  } else {
    this.value = "";
    if(score >= 1) {
      document.querySelector('.results').style.opacity = 1;
      document.querySelector('.results').textContent = 'Wrong Guess! Try Again';
      score--;
      document.querySelector('#current-score').textContent = `Current Score: ${score}`;
    } else {
      document.querySelector('.results').textContent = 'Game Over, You Lost!';
    }
    document.querySelector('.results').style.backgroundColor = 'red';
    document.querySelector('.results').style.color = 'white';
    document.querySelector('.results').style.fontSize = 'larger';
    document.querySelector('.results').style.fontWeight = 'bolder';
  }
  console.log(guess);
  console.log(`${randomCountry} is the random country`);
});

const reset = function () {
  score = 5;
  document.querySelector('#current-score').textContent = `Current Score: ${score}`;
  document.querySelector('.results').style.opacity = 0;
  document.getElementById('cc').innerHTML = ""
  getRandomCountryAndDataFromApi();
  // location.reload();
};

document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById('rules-btn').addEventListener('click', function() {
  alert("Here are the rules of the game");
})
