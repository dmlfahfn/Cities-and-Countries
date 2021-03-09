//Import Modules

//Import fetch
import { fetchJson } from "./moduler/fetch.mjs";

import { printCountries, printCitys, getCityInfo } from "./moduler/template.mjs";

import { getPopulation } from "./moduler/population.mjs";
import { calculatePopulation } from "./moduler/calculatePopulation.mjs";

// Gör saveCity tillgänglig till andra moduler
import {
	getSavedCities,
	saveCity,
	isCityVisited,
	render,
} from "./moduler/storedCities.mjs";
export { isCityVisited, calculatePopulation };

// Program starts

// (1)  Fetches Json Files
fetchJson();

render();

// (2) Get Json data
let countryFile = JSON.parse(localStorage.getItem("landFile"));
let cityFile = JSON.parse(localStorage.getItem("stadFile"));

// (3) Shows Json data
//Prints countrys
printCountries(countryFile);

// (4) Gets elements
let countryNav = document.getElementById("nav");
let addCityBtn = document.getElementById("addCity");

// (5) Declare Variables
let clickedCity;
// population(e.target.id)

// (6) Event Listeners
//If click on country
countryNav.addEventListener("click", (e) => {
	if (e.target.getAttribute("data-type") == "country"){
		printCitys(cityFile, e);
		//console.log("Stämmer!");
	}
});

//If Click on city
countryNav.addEventListener("click", (e) => {
	//Get event
	let element = e.target;
	//Gets li elements in element
	let li = element.getElementsByTagName("li");

	//Checks if countries concists of cities
	if (li != null) {
		//Checks for event

        if (e.target.getAttribute("data-type") == "city"){
        clickedCity = e.target.id;
        getCityInfo(cityFile, e);
        }
	}
});

// If save visited city
document.addEventListener("click", (e) => {
	if (e.target.id == "addCity") {
		e.target.disabled = true;
		e.target.innerHTML = "Besökt";
		saveCity(parseInt(clickedCity));
	}
});