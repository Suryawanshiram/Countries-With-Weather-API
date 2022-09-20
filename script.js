//Dom elements 
const container=document.createElement('div');
const countriesRow=document.createElement('div');
const h1=document.createElement('h1');


//container Attributes
container.setAttribute("class","container");
container.setAttribute("id","container");

//heading attributes with inner Text 
h1.setAttribute("id","title");
h1.setAttribute("class","text-center");
h1.innerText="Countries With Weather Info"

//card row div element 
countriesRow.setAttribute("class","row");
//fetch the data from restcountries api and display
//the data in DOM 
async function countryInfo(){
  countriesRow.innerHTML=`<h4>Please Wait...</h4>`;

  try {
    const response=await fetch("https://restcountries.com/v3.1/all");
    const data=await response.json();
    console.log(data[150]);
    countriesRow.innerHTML="";
    for(let i=0;i<data.length;i++) {
      countriesRow.innerHTML+=`
  <div class=" col-sm-6 col-md-4 col-lg-4 col-xl-4 bg-warning g-5>
    <div class="container card h-100 w-auto " style="width:18rem;" id="card>
      <div class="card-header text-center" id="country-name">${data[i].name.common} 
      <img src="${data[i].flags.svg}" class="card-img-top" alt="country-cards" />
      <div class="card-body">
      <div class="card-text"><b>Region:</b>${data[i].region}</div>
      <div class="card-text"><b>Country-Code:</b>${data[i].altSpellings[0]}</div>
      <div class="card-text"><b>Capital:</b>${data[i].capital}</div>
      <div class="card-text"><b>Population:</b>${data[i].population}</div>
      <div id="${data[i].name.common}"></div>
      </div>
      <div class="card-footer d-flex justify-content-center"> <br> 
      <button class="btn btn-primary" onClick="getWeather(${data[i].latlng[0]},${data[i].latlng[1]},'${data[i].name.common}')">Click for Weather</button>
      </div>
      </div> 
    </div>
      </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}


//fetching the dat from the weather api and showing weather 
async function getWeather(lat,lon,id){
const weatherData=document.getElementById(id);
weatherData.innerHTML=`<h3>Loading weather...</h3>`;

try {
  
  const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0bc8b2970a1bb3acfbb8f8f2dd8f8e8a`)
  const wdata=await res.json();
  console.log(wdata);
  console.log(wdata.weather[0].icon)
  weatherData.innerHTML+=`
  <div class="card-text"><b>Weather:</b>${wdata.main.temp}&#8451 </div>  
  `
} catch (error) {
  console.log(error);
}
}


//append all created element to the container
document.body.appendChild(container);
container.append(h1,countriesRow)

countryInfo();