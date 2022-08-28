"use strict";
const countriesCard = document.querySelector(".country-card");
const introBox = document.querySelector(".intro");
const guess = document.querySelector(".guess-bar").value;
const message = document.querySelector(".results").textContent;

let randomCountry = [];
let country;
let incorrectGuesses = [];

const getRandomCountryAndDataFromApi = function () {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then(function (data) {
      const allCountries = [];
      data.forEach((country) => allCountries.push(country.name.common));
      country =
        allCountries[`${Math.floor(Math.random() * (250 - 0 + 1)) + 0}`];
      console.log(country);
      // return allCountries[`${randomNum(0, 250)}`];
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then((response) => response.json())
    .then(function (data) {
      randomCountry.push(data[0].name.common);
      randomCountry.push(
        (+data[0].population / 1000000).toFixed(2) + " million"
      );
      randomCountry.push(Number(data[0].area).toLocaleString() + " km²");
      randomCountry.push(data[0].continents[0]);
      // randomCountry.push(data[0].capital[0]);
      randomCountry.push(data[0].capital[0]);
      const html = `
        <div class="population" id="country-snippet1">
          <b>Population:</b> ${
            (+data[0].population / 1000000).toFixed(2) + " million"
          }
        </div>
        <div class="size" id="country-snippet2">
          <b>Land Size:</b> ${Number(data[0].area).toLocaleString() + " km²"}
        </div>
        <div class="continent" id="country-snippet3">
          <b>Continent:</b> ${data[0].continents[0]}
        </div>
        <div class="capital" id="country-snippet4">
          <b>Capital City:</b> ${data[0].capital[0]}
        </div>
        <div class="flag" id="country-snippet5">
          <div class="flag-container">
            <img src="${
              data[0].flags.png
            }" alt="" style="height: 120px; width: 200px; border: 1px solid black;">
          </div>
        </div>
      `;
      countriesCard.insertAdjacentHTML("beforeend", html);
      // document.querySelector('.results').style.opacity = 1;
    });
};

// document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById("rules-btn").addEventListener("click", function () {
  alert(
    "Test Your Geography Knowledge!\n- You get 4 guesses to pick the correct country\n- New information is revealed after each wrong guess\n- Good Luck!"
  );
});

let score = 5;
let highScore = 0;
let count = 1;

const successfullGuess = function () {
  document.querySelector(".results").style.opacity = 1;
  document.querySelector(
    ".results"
  ).textContent = `Correct! You got it in ${count} ${
    count > 1 ? "attempts" : "attempt"
  }`;
  document.querySelector(".results").style.backgroundColor = "#60b347";
  // document.querySelector(".results").style.border = "2px, solid, white";
  document.querySelector(".results").style.color = "white";
  document.querySelector(".results").style.fontSize = "larger";
  document.querySelector(".results").style.fontWeight = "bolder";
  document.querySelector("#country-snippet2").style.opacity = 1;
  document.querySelector("#country-snippet3").style.opacity = 1;
  document.querySelector("#country-snippet4").style.opacity = 1;
  document.querySelector("#country-snippet5").style.opacity = 1;
};

const unsuccessfullGuess = function () {
  // count ++;
  document.querySelector(".incorrect-guesses").style.opacity = 1;
  document.querySelector(".results").style.opacity = 1;
  document.querySelector(".results").textContent = "Wrong Guess! Try Again";
  score--;
  // CLEAR INPUT FIELD
  // document.querySelector(
  //   "#current-score"
  // ).textContent = `Current Score: ${score}`;
  document.querySelector(".results").style.backgroundColor = "#FA6161";
  document.querySelector(".results").style.color = "white";
  document.querySelector(".results").style.fontSize = "larger";
  document.querySelector(".results").style.fontWeight = "bolder";
  document.getElementById(
    "wrong-guesses"
  ).innerHTML = `<div> ❌${incorrectGuesses}❌</div>`;
};

const begin = function () {
  document.getElementById("play-btn").addEventListener("click", function () {
    getRandomCountryAndDataFromApi();
    setTimeout(function () {
      countriesCard.style.opacity = 1;
      document.querySelector(".content").style.opacity = 1;
      document.querySelector(".guess-box").style.opacity = 1;
      // document.querySelector(".scores").style.opacity = 1;
      document.querySelector("#play-btn").style.opacity = 0;
      document.querySelector("#reset-btn").style.opacity = 1;
      // document.querySelector("#play-btn").innerHTML = "Reset";
    }, 1750);
  });
};

const checkGuess = function (guesses) {
  document.querySelector(".guess-bar").addEventListener("change", function () {
    let guess = this.value;
    if (guess.toLowerCase() === randomCountry[0].toLowerCase()) {
      successfullGuess();
    }
    if (guess.toLowerCase() != randomCountry[0].toLowerCase()) {
      incorrectGuesses.push(guess);
      console.log(incorrectGuesses);
      guess = "";
      unsuccessfullGuess();
      document.querySelector(`#country-snippet${count + 1}`).style.opacity = 1;
      count++;
    }
    if (count > 5) {
      document.querySelector(
        ".results"
      ).textContent = `Attemps Expired. Correct Answer is ${randomCountry[0]}`;
    }
  });
};

const play = function () {
  checkGuess(count);
};

document.querySelector("#reset-btn").addEventListener("click", function () {
  location.reload();
});

begin();
play();
