const urlUSA = 'https://disease.sh/v3/covid-19/jhucsse/counties'



//from URL (states) to drop down 1
const getOptions = async () => {
    try {
        const responseStates = await axios.get(urlUSA)
        const states = [] // holds all states

        responseStates.data.forEach((check) => {
            if (!states.includes(check.province)) {
                states.push(check.province)
            }
        })
        listStates(states)

    } catch (error) {
        console.log(error)
    }

}

getOptions()


//List States to drop down page 2

function listStates(list) {
    const selectStates = document.querySelector('#select-states')
    return list.forEach((loopEachStates) => {
        const option = document.createElement('option')
        option.value = `${loopEachStates}`
        option.textContent = `${loopEachStates}`
        selectStates.append(option)
    })

}

//It gets value(output) from drop down States 4
function getValue(e) {
    e.preventDefault()
    const stateValue = document.querySelector('#select-states').value //- gets value of states
    getCounty(stateValue) //- passes the value to next step
    removeCounty()

}

//Event Listener for the click 3 
const form = document.querySelector('form')
form.addEventListener('submit', getValue)


///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST


//Request by state for county 5
async function getCounty(nameState) {
    try {
        const responseCounty = await axios.get(urlUSA)
        const allCounty = [] // holds all county after choosing state
        responseCounty.data.forEach((check) => {
            if (check.province === nameState) {
                allCounty.push(check.county)
            }
        })
        newCountySection()
        listCounty(allCounty)


    } catch (error) {
        console.log(error)
    }



}

//FINISH REQUEST//FINISH REQUEST//FINISH REQUEST//FINISH REQUEST//FINISH REQUEST//FINISH REQUEST


// Creats new county-section for chosen state 6
function newCountySection(data) {
    const searchSection = document.querySelector('#search-county')
    const newform = document.createElement('form')
    const newSectionCounty = document.createElement('select')
    const button = document.createElement('button')

    searchSection.append(newform)
    newform.append(newSectionCounty)
    newSectionCounty.id = 'select-county'
    newform.append(button)
    button.type = 'submit'
    button.textContent = 'submit'
    // newSelectionCounty.nameState = "County" -?????
}


//Lists chosen state's all county 7
function listCounty(list) {
    const selectCounty = document.querySelector('#select-county')
    return list.forEach((loopEachCounty) => {
        const option = document.createElement('option')
        option.value = `${loopEachCounty}`
        option.textContent = `${loopEachCounty}`
        selectCounty.append(option)
    })

}


//Remove county section after choosing different state 8
function removeCounty() {
    let county = document.querySelector('#search-county')
    while (county.firstChild) {
        county.removeChild(county.firstChild)
    }

}

///FINAL OUTPUT///FINAL OUTPUT ///FINAL OUTPUT ///FINAL OUTPUT ///FINAL OUTPUT ///FINAL OUTPUT ///FINAL OUTPUT  


// ///It gets value(output) from drop down County 10
function getValueCounty(e) {
    e.preventDefault()
    const countyValue = document.querySelector('#select-county').value //- gets value of states
    const stateValue = document.querySelector('#select-states').value
    finalCounty(countyValue,stateValue) //- passes the value to next step


}

//Event Listener for the submit  9 
const countyForm = document.querySelector('#search-county')
countyForm.addEventListener('submit', getValueCounty)



//Request by county for output5
async function finalCounty(nameCounty,nameState) {
    try {
        const chosenCounty = await axios.get(urlUSA)
        let updatedTime = []
        let confirmedCases = []
        let confirmedDeaths = []
        let recovered = []
        chosenCounty.data.forEach((check) => {
            if (check.county === nameCounty) {
                // console.log(check.province)
                // console.log(check.county)
                // console.log(check.updatedAt)
                // console.log(check.stats.confirmed)
                // console.log(check.stats.deaths)
                // console.log(check.stats.recovered)
            }
        })
        
    } catch (error) {
        console.log(error)
    }



}


//Match same county
