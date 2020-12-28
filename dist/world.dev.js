"use strict";

var urlWorldwide = 'https://disease.sh/v3/covid-19/jhucsse';

function getInputs(choosenCountry) {
  var responseWorld, totalWCases, totalWDeaths, allCountry, countryName, confirmedCountryCase, confirmedCountryDeaths, recoveredCountry;
  return regeneratorRuntime.async(function getInputs$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get(urlWorldwide));

        case 3:
          responseWorld = _context.sent;
          //TOTAL CASES
          totalWCases = 0;
          responseWorld.data.forEach(function (check) {
            totalWCases += parseInt(check.stats.confirmed);
          }); // TOTAL DEATHS

          totalWDeaths = 0;
          responseWorld.data.forEach(function (check) {
            totalWDeaths += parseInt(check.stats.deaths);
          });
          removeWTotalAgain();
          totalWCasesDeaths(totalWCases, totalWDeaths); // LIST COUNTRY

          allCountry = [];
          responseWorld.data.forEach(function (check) {
            if (!allCountry.includes(check.country)) {
              allCountry.push(check.country);
            }
          });
          listCountries(allCountry);
          countryName = [];
          countryName.push(choosenCountry); // After each loop it should add new string except returning empty

          confirmedCountryCase = 0;
          confirmedCountryDeaths = 0;
          recoveredCountry = 0;
          responseWorld.data.forEach(function (check) {
            if (check.country === choosenCountry) {
              confirmedCountryCase += parseInt(check.stats.confirmed);
              confirmedCountryDeaths += parseInt(check.stats.deaths);
              recoveredCountry += parseInt(check.stats.recovered);
            }
          });
          showCountry(countryName, confirmedCountryCase, confirmedCountryDeaths, recoveredCountry);
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

getInputs(); // Total cases and deaths on page

function totalWCasesDeaths(cases, deaths) {
  var tWCases = document.querySelector('#totalW-cases');
  var tWDeaths = document.querySelector('#totalW-deaths');
  var p1 = document.createElement('p').innerHTML = "Total Cases: ".concat(cases);
  var p2 = document.createElement('p').innerHTML = "Total Deaths: ".concat(deaths);
  tWCases.append(p1);
  tWDeaths.append(p2);
} // REMOVES REPEAT


function removeWTotalAgain() {
  var tWCases = document.querySelector('#totalW-cases');
  var tWDeaths = document.querySelector('#totalW-deaths');

  while (tWDeaths.lastChild) {
    tWDeaths.removeChild(tWDeaths.lastChild);
  }

  while (tWCases.firstChild) {
    tWCases.removeChild(tWCases.lastChild);
  }
} // List Countries to drop down page


function listCountries(country) {
  var selectCountry = document.querySelector('#select-country');
  return country.forEach(function (loopEachCountry) {
    var option = document.createElement('option');
    option.value = "".concat(loopEachCountry);
    option.textContent = "".concat(loopEachCountry);
    selectCountry.append(option);
  });
} // It gets value (output) from drop down


function getCountryName(e) {
  e.preventDefault();
  var countryValue = document.querySelector('#select-country').value; //- gets value of states

  if (countryValue === 'selectC') {
    return false;
  } else {
    getInputs(countryValue); //- passes the value to next step
  }
} // Event Listener for click 


var countryEvent = document.querySelector('#country form');
countryEvent.addEventListener('submit', getCountryName); // It shows information on the page

function showCountry(countryName, confirmedCountryCase, confirmedCountryDeaths, recoveredCountry) {
  var showCountryInfo = "\n    <h3>Last Updated Time: <strong> TODAY </strong></h3>\n    <h3>Country:<strong> ".concat(countryName, "</strong></h3>\n    <h3>Confirmed Cases:<strong> ").concat(confirmedCountryCases, "</strong></h3>\n    <h3>Confirmed Deaths:<strong>").concat(confirmedCountryDeaths, "</strong></h3>\n    <h3>Recovered:<strong>").concat(recovered, "</strong> </h3>\n    ");
  document.querySelector('#post-data').insertAdjacentHTML('beforeend', showCountyInfo);
}