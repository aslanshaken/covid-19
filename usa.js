const urlUSA = 'https://disease.sh/v3/covid-19/jhucsse/counties'


// Main ASYNC
async function getOptions(choosenState, choosenCounty) {
    try {
        const response = await axios.get(urlUSA)

        // TOTAL CASES
        let totalCases = 0
        response.data.forEach((check) => {
            totalCases += parseInt(check.stats.confirmed)
        })

        // TOTAL DEATHS
        let totalDeaths = 0
        response.data.forEach((check) => {
            totalDeaths += parseInt(check.stats.deaths)
        })
        removeTotalAgain()
        totalCasesDeaths(totalCases, totalDeaths)
        


        // LIST STATES
        const states = [] // holds all states 
        response.data.forEach((check) => {
            if (!states.includes(check.province)) {
                states.push(check.province)
            }
        })
        listStates(states)

        // LIST COUNTIES
        const allCounty = [] // holds all county after choosing state
        response.data.forEach((check) => {
            if (check.province === choosenState) {
                allCounty.push(check.county)

            }
        })
        listCounty(allCounty)

        // PUTS CHOOSEN COUNTY INFO IN PAGE
        let province = []
        let county = []
        let confirmedCases = []
        let confirmedDeaths = []
        let recovered = []
        response.data.forEach((check) => {
            if (check.province === choosenState) {
                if (check.county === choosenCounty) {
                    province.push(check.province)
                    county.push(check.county)
                    confirmedCases.push(check.stats.confirmed)
                    confirmedDeaths.push(check.stats.deaths)
                    recovered.push(check.stats.recovered)
                }
            }

        })
        removePostData()
        showStateCounty(province, county, confirmedDeaths, confirmedCases, recovered)


    } catch (error) {
        console.log(error)
    }

}

getOptions()


//List States to drop down page 

function listStates(list) {
    const selectStates = document.querySelector('#select-states')
    return list.forEach((loopEachStates) => {
        const option = document.createElement('option')
        option.value = `${loopEachStates}`
        option.textContent = `${loopEachStates}`
        selectStates.append(option)
    })

}

//It gets value(output) from drop down States  
function getState(e) {
    e.preventDefault()
    const stateValue = document.querySelector('#select-states').value //- gets value of states
    if (stateValue === 'selectS') {
        return false
    }
    else {
        getOptions(stateValue) //- passes the value to next step
        removeCounty()
        newCountySection()
    }
}


//It gets value(output) from drop down States  
function getCounty(e) {
    e.preventDefault()
    const stateValue = document.querySelector('#select-states').value
    const countyValue = document.querySelector('#select-county').value
    getOptions(stateValue, countyValue) //- passes the value to next step

}


//Event Listener for the click states and counties 
const form = document.querySelector('form')
form.addEventListener('submit', getState)
const countyForm = document.querySelector('#search-county')
countyForm.addEventListener('submit', getCounty)

// Creats new county-section for chosen state
function newCountySection() {
    const searchSection = document.querySelector('#search-county')
    const newform = document.createElement('form')
    const newSectionCounty = document.createElement('select')
    const button = document.createElement('button')

    searchSection.append(newform)
    newform.append(newSectionCounty)
    newSectionCounty.id = 'select-county'
    newform.append(button)
    button.id = 'county-button'
    button.type = 'submit'
    button.textContent = 'Submit'
    // newSelectionCounty.nameState = "County" -?????
}


//Lists chosen state's all county 
function listCounty(list) {
    const selectCounty = document.querySelector('#select-county')
    return list.forEach((loopEachCounty) => {
        const option = document.createElement('option')
        option.value = `${loopEachCounty}`
        option.textContent = `${loopEachCounty}`
        selectCounty.append(option)
    })

}


//Remove county section after choosing different state 
function removeCounty() {
    let county = document.querySelector('#search-county')
    while (county.firstChild) {
        county.removeChild(county.firstChild)
    }
}


//shows info on the page. 
function showStateCounty(province, county, confirmedDeaths, confirmedCases, recovered) {
    const showCountyInfo = `
<h3>State:<strong> ${province}</strong></h3>
<h3>County:<strong> ${county}</strong></h3>
<h3>Confirmed Cases:<strong> ${confirmedCases.toLocaleString('en', {useGrouping:true})}</strong></h3>
<h3>Confirmed Deaths:<strong> ${confirmedDeaths.toLocaleString('en', {useGrouping:true})}</strong></h3>
`
{/* <h3>Recovered:<strong> ${recovered.toLocaleString('en', {useGrouping:true})}</strong> </h3> */}
    document.querySelector('#post-data').insertAdjacentHTML('beforeend', showCountyInfo)

}


//removes POST-DATA info
function removePostData() {
    let postData = document.querySelector('#post-data')
    while (postData.firstChild) {
        postData.removeChild(postData.firstChild)
    }
}


// Total cases and deaths on page
function totalCasesDeaths(cases, deaths) {
    let tCases = document.querySelector('#totalU-cases')
    let tDeaths = document.querySelector('#totalU-deaths')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')

    tCases.innerHTML = 'Total Cases:'
    tDeaths.innerHTML = 'Total Deaths:'
    p1.innerHTML = `${cases.toLocaleString('en', {useGrouping:true})}`
    p2.innerHTML = `${deaths.toLocaleString('en', {useGrouping:true})}`
    
    tCases.append(p1)
    tDeaths.append(p2)

    
}

function removeTotalAgain() {
let tCases = document.querySelector('#totalU-cases')
let tDeaths = document.querySelector('#totalU-deaths')
while (tDeaths.lastChild) {
    tDeaths.removeChild(tDeaths.lastChild)
}
while (tCases.firstChild) {
    tCases.removeChild(tCases.lastChild)
}
}