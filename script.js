'use strict';

const allCountries = [];
const getAllCountries = function () {
  fetch('https://restcountries.com/v3.1/all').then(function(response) {
  return response.json();
}).then(function (data) {
  data.forEach(country => console.log(country.name.common));
  data.forEach(c => allCountries.push(c));
  // data.forEach(country => allCountries.push(country));
  // console.log(data.slice(2));
  // allCountries = Object.keys(data);
});
}



getAllCountries();
console.log(allCountries);
const randomCountry = allCountries.map(country => country.name);
console.log('testingtestingtesting');
console.log(randomCountry);
// console.log(allCountries);
// // // console.log(Object.keys(getAllCountries()));
// // // console.log(allCountries);

// // // const randomCountry = allCountries.map(country => country.name.common);
// // // console.log(randomCountry);
// let allCountryData = [];
// function getAllCountries() {
//   fetch('https://restcountries.com/v3.1/all').then(function(response) {
//     return response.json();
//   }).then(function (data) {
//     data.forEach(country => allCountryData.push(country));
//   })
// };

// // const countries = getAllCountries();
// getAllCountries();
// // console.log(allCountryData);
// // const countryNames = allCountryData.map(country => country.name);
// // console.log(countryNames);
// const randomCountry = function () {
//   const c = allCountryData.forEach(country => country.name.common);
//   console.log(c);
// }

// randomCountry();
