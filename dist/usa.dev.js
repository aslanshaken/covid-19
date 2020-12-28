"use strict";

var urlUSA = 'https://disease.sh/v3/covid-19/jhucsse/counties'; // Main ASYNC

function getOptions(choosenState, choosenCounty) {
  var response, totalCases, totalDeaths, states, allCounty, province, county, updatedTime, confirmedCases, confirmedDeaths, recovered;
  return regeneratorRuntime.async(function getOptions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get(urlUSA));

        case 3:
          response = _context.sent;
          // TOTAL CASES
          totalCases = 0;
          response.data.forEach(function (check) {
            totalCases += parseInt(check.stats.confirmed);
          }); // TOTAL DEATHS

          totalDeaths = 0;
          response.data.forEach(function (check) {
            totalDeaths += parseInt(check.stats.deaths);
          });
          removeTotalAgain();
          totalCasesDeaths(totalCases, totalDeaths); // LIST STATES

          states = []; // holds all states 

          response.data.forEach(function (check) {
            if (!states.includes(check.province)) {
              states.push(check.province);
            }
          });
          listStates(states); // LIST COUNTIES

          allCounty = []; // holds all county after choosing state

          response.data.forEach(function (check) {
            if (check.province === choosenState) {
              allCounty.push(check.county);
            }
          });
          listCounty(allCounty); // PUTS CHOOSEN COUNTY INFO IN PAGE

          province = [];
          county = [];
          updatedTime = [];
          confirmedCases = [];
          confirmedDeaths = [];
          recovered = [];
          response.data.forEach(function (check) {
            if (check.province === choosenState) {
              if (check.county === choosenCounty) {
                province.push(check.province);
                county.push(check.county);
                updatedTime.push(check.updatedAt);
                confirmedCases.push(check.stats.confirmed);
                confirmedDeaths.push(check.stats.deaths);
                recovered.push(check.stats.recovered);
              }
            }
          });
          removePostData();
          showStateCounty(province, county, updatedTime, confirmedDeaths, confirmedCases, recovered);
          _context.next = 30;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 27]]);
}

getOptions(); //List States to drop down page 

function listStates(list) {
  var selectStates = document.querySelector('#select-states');
  return list.forEach(function (loopEachStates) {
    var option = document.createElement('option');
    option.value = "".concat(loopEachStates);
    option.textContent = "".concat(loopEachStates);
    selectStates.append(option);
  });
} //It gets value(output) from drop down States  


function getState(e) {
  e.preventDefault();
  var stateValue = document.querySelector('#select-states').value; //- gets value of states

  if (stateValue === 'selectS') {
    return false;
  } else {
    getOptions(stateValue); //- passes the value to next step

    removeCounty();
    newCountySection();
  }
} //It gets value(output) from drop down States  


function getCounty(e) {
  e.preventDefault();
  var stateValue = document.querySelector('#select-states').value;
  var countyValue = document.querySelector('#select-county').value;
  getOptions(stateValue, countyValue); //- passes the value to next step
} //Event Listener for the click states and counties 


var form = document.querySelector('form');
form.addEventListener('submit', getState);
var countyForm = document.querySelector('#search-county');
countyForm.addEventListener('submit', getCounty); // Creats new county-section for chosen state

function newCountySection() {
  var searchSection = document.querySelector('#search-county');
  var newform = document.createElement('form');
  var newSectionCounty = document.createElement('select');
  var button = document.createElement('button');
  searchSection.append(newform);
  newform.append(newSectionCounty);
  newSectionCounty.id = 'select-county';
  newform.append(button);
  button.id = 'county-button';
  button.type = 'submit';
  button.textContent = 'Submit'; // newSelectionCounty.nameState = "County" -?????
} //Lists chosen state's all county 


function listCounty(list) {
  var selectCounty = document.querySelector('#select-county');
  return list.forEach(function (loopEachCounty) {
    var option = document.createElement('option');
    option.value = "".concat(loopEachCounty);
    option.textContent = "".concat(loopEachCounty);
    selectCounty.append(option);
  });
} //Remove county section after choosing different state 


function removeCounty() {
  var county = document.querySelector('#search-county');

  while (county.firstChild) {
    county.removeChild(county.firstChild);
  }
} //shows info on the page. 


function showStateCounty(province, county, updatedTime, confirmedDeaths, confirmedCases, recovered) {
  var showCountyInfo = "\n<h3>Last Updated Time: <strong> ".concat(updatedTime, "</strong></h3>\n<h3>State:<strong> ").concat(province, "</strong></h3>\n<h3>County:<strong> ").concat(county, "</strong></h3>\n<h3>Confirmed Cases:<strong> ").concat(confirmedCases, "</strong></h3>\n<h3>Confirmed Deaths:<strong>").concat(confirmedDeaths, "</strong></h3>\n<h3>Recovered:<strong>").concat(recovered, "</strong> </h3>\n");
  document.querySelector('#post-data').insertAdjacentHTML('beforeend', showCountyInfo);
} //removes POST-DATA info


function removePostData() {
  var postData = document.querySelector('#post-data');

  while (postData.firstChild) {
    postData.removeChild(postData.firstChild);
  }
} // Total cases and deaths on page


function totalCasesDeaths(cases, deaths) {
  var tCases = document.querySelector('#totalU-cases');
  var tDeaths = document.querySelector('#totalU-deaths');
  var p1 = document.createElement('p').innerHTML = "Total Cases: ".concat(cases);
  var p2 = document.createElement('p').innerHTML = "Total Deaths: ".concat(deaths);
  tCases.append(p1);
  tDeaths.append(p2);
}

function removeTotalAgain() {
  var tCases = document.querySelector('#totalU-cases');
  var tDeaths = document.querySelector('#totalU-deaths');

  while (tDeaths.lastChild) {
    tDeaths.removeChild(tDeaths.lastChild);
  }

  while (tCases.firstChild) {
    tCases.removeChild(tCases.lastChild);
  }
}