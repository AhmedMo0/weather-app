/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '&appid=b70d4425b418b2651dd27b03162c0aa0&units=imperial';
let zipCode = 'zip=94040,';
let countryCode = 'US';

// uncomment the below code to get country code of current client and change global variable 'countryCode'
/* 
// to get country code
fetch('https://api.ipregistry.co/?key=tryout')

.then(function (response) {
    return response.json();
})

.then(function (res) {
    countryCode = res.location.country.code; 
    
});
*/


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// fetch data from api
const callApi = async (bUrl, zCode=0, cCode='none')=>{
    
    const res = await fetch(bUrl+zCode+cCode+apiKey);
    try{

        const newData = await res.json();
        return newData;
    }catch(e){
        console.log('errot: ', e);
    }
}

// get data from server
const getData = async (url='')=>{
    try{
        const res = await fetch(url);
        const newData = await res.json();

        return newData;
    }catch(e){
        console.log('errot: ', e);
    }
}

// post data to server
const postData = async (url='', data={})=>{
    
    try{
        const res = await fetch(url, {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const newData = await res.json;

        return newData;
    }catch(e){
        console.log('errot: ', e);
    }
}


// after user clicks on generate will send zipcode and countryCode to api
// then the response will go to server using postData()
//after that using getData() that will retrive data from server to the client

function postGet(){

    zipCode = `zip=${document.getElementById("zip").value},`;

    callApi(baseUrl, zipCode, countryCode)
        .then(function(data){

            
            data['fav'] = feelingsInput.value;

            postData('/gen', data)

            getData('/getData')
                .then(function(f){
                    updateUI(f);
                })
        })
}


// preparing dom elements
let feelingsInput = document.getElementById("feelings");
let temp = document.getElementById("temp");
let content = document.getElementById("content");
let weatherStatusP = document.createElement("P");
let descriptionP = document.createElement("P");
let date = document.getElementById("date");

content.appendChild(weatherStatusP);
content.appendChild(descriptionP);

// update with new data
async function updateUI(data = {})
{

    date.innerHTML = `Date: ${newDate}`;

    let strTemp = `\ntemp: ${data.temp} F.degree`;
    temp.innerHTML = strTemp;

    let strWeatherStatus= `Weather Status: ${data.description}`;
    weatherStatusP.innerHTML = strWeatherStatus;

    let strUserDescription = `user feelings: ${data.fav}`;
    descriptionP.innerHTML = strUserDescription;


}

// generate button listener 
document.getElementById('generate').addEventListener('click', postGet);
