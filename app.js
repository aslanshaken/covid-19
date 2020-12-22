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
}

//Event Listener for the click 3 
const form = document.querySelector('form')
form.addEventListener('submit', getValue)


///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST///NEW REQUEST


//Request by state for county
async function getCounty(nameState) {
    try {
        const responseCounty = await axios.get(urlUSA)
        const allCounty = [] // holds all county after choosing state
        responseCounty.data.forEach((check) => {
            if (check.province === nameState) {
                allCounty.push(check.county)
            }
        })

    } catch (error) {
        console.log(error)
    }



}

//FINISH REQUEST 