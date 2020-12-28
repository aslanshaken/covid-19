const urlWorldwide = 'https://disease.sh/v3/covid-19/jhucsse'

async function getInputs(choosenCountry) {
    try {
        const responseWorld = await axios.get(urlWorldwide)

        //TOTAL CASES
        let totalWCases = 0
        responseWorld.data.forEach((check) => {
            totalWCases += parseInt(check.stats.confirmed)
        });


        // TOTAL DEATHS
        let totalWDeaths = 0
        responseWorld.data.forEach((check) => {
            totalWDeaths += parseInt(check.stats.deaths)
        });

        // TOTAL RECOVERED
        let totalWRecovered = 0
        responseWorld.data.forEach((check) => {
         totalWRecovered += parseInt(check.stats.recovered)
        })
        
        removeWTotalAgain()
        totalWCasesDeathsRecovered(totalWCases, totalWDeaths, totalWRecovered)


        // LIST COUNTRY
        const allCountry = []
        responseWorld.data.forEach((check) => {
            if (!allCountry.includes(check.country)) {
                allCountry.push(check.country)
            }
        })
        listCountries(allCountry)


        let countryName = []
        countryName.push(choosenCountry) // After each loop it should add new string except returning empty
        let confirmedCountryCase = 0
        let confirmedCountryDeaths = 0
        let recoveredCountry = 0
        responseWorld.data.forEach((check) => {
            if (check.country === choosenCountry) {
                confirmedCountryCase += parseInt(check.stats.confirmed)
                confirmedCountryDeaths += parseInt(check.stats.deaths)
                recoveredCountry += parseInt(check.stats.recovered)
            }
        })
        removePostWData()
        showCountry(countryName, confirmedCountryCase, confirmedCountryDeaths, recoveredCountry)


    } catch (error) {
        console.log(error)
    }


}
getInputs()


// Total cases and deaths on page
function totalWCasesDeathsRecovered(cases, deaths, recovered) {
    let tWCases = document.querySelector('#totalW-cases')
    let tWDeaths = document.querySelector('#totalW-deaths')
    let tWRecovered = document.querySelector('#totalW-recovered')
    let p1 = document.createElement('p').innerHTML = `Total Cases: ${cases.toLocaleString('en', {useGrouping:true})}`
    let p2 = document.createElement('p').innerHTML = `Total Deaths: ${deaths.toLocaleString('en', {useGrouping:true})}`
    let p3 = document.createElement('p').innerHTML = `Total Recovered: ${recovered.toLocaleString('en', {useGrouping:true})}`
    tWCases.append(p1)
    tWDeaths.append(p2)
    tWRecovered.append(p3)
}
// REMOVES REPEAT
function removeWTotalAgain() {
    let tWCases = document.querySelector('#totalW-cases')
    let tWDeaths = document.querySelector('#totalW-deaths')
    let tWRecovered = document.querySelector('#totalW-recovered')
    while (tWDeaths.lastChild) {
        tWDeaths.removeChild(tWDeaths.lastChild)
    }
    while (tWCases.firstChild) {
        tWCases.removeChild(tWCases.lastChild)
    }
    while (tWRecovered.firstChild) {
        tWRecovered.removeChild(tWRecovered.lastChild)
    }
}


// List Countries to drop down page
function listCountries(country) {
    const selectCountry = document.querySelector('#select-country')
    return country.forEach((loopEachCountry) => {
        const option = document.createElement('option')
        option.value = `${loopEachCountry}`
        option.textContent = `${loopEachCountry}`
        selectCountry.append(option)
    })
}


// It gets value (output) from drop down
function getCountryName(e) {
    e.preventDefault()
    const countryValue = document.querySelector('#select-country').value //- gets value of states
    if (countryValue === 'selectC') {
        return false
    } else {
        getInputs(countryValue) //- passes the value to next step
    }

}

// Event Listener for click 
const countryEvent = document.querySelector('#country form')
countryEvent.addEventListener('submit', getCountryName)


// It shows information on the page
function showCountry(countryName, confirmedCountryCase, confirmedCountryDeaths, recoveredCountry) {
    const showCountryInfo = `
    <h3>Country:<strong> ${countryName}</strong></h3>
    <h3>Confirmed Cases:<strong> ${confirmedCountryCase.toLocaleString('en', {useGrouping:true})}</strong></h3>
    <h3>Confirmed Deaths:<strong> ${confirmedCountryDeaths.toLocaleString('en', {useGrouping:true})}</strong></h3>
    <h3>Recovered:<strong> ${recoveredCountry.toLocaleString('en', {useGrouping:true})}</strong> </h3>
    `
    document.querySelector('#postW-data').insertAdjacentHTML('beforeend', showCountryInfo)
}

function removePostWData() {
    let postWdata = document.querySelector('#postW-data')
    while (postWdata.firstChild) {
        postWdata.removeChild(postWdata.firstChild)
    }
}

