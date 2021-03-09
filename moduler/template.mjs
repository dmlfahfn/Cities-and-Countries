//Functions that create html elements
import { isCityVisited } from "../script.js";

// Import fetched wiki, weather data
import {fetchWikiApi,fetchWeatherApi} from "./fetch.mjs";
// import { calculatePopulation } from "./calculatePopulation.mjs"

/**
 *@Description Function that prints countries from Json File
 */

export function printCountries(countryFile) {
	//Get nav Element
	let nav = document.getElementById("nav");

	for (let country in countryFile) {
		//Create ul element
		let countryUl = document.createElement("ul");

		//Set id for li element
		countryUl.id = countryFile[country].id;

		//Set Data attribute for li element
		countryUl.setAttribute('data-type', 'country');

		//Set inner HTML for UL element
		countryUl.innerHTML = countryFile[country].countryname;

		//Inserts ul element in section
		nav.insertAdjacentElement("afterbegin", countryUl);
	}
}

/**
 *@Description Function that prints cities from Json File
 */

export function printCitys(cityFile, e) {
	//Gets the element id
	let countryId = e.target;
	let countryUl = document.getElementById(countryId.id);
	let openCityUl = document.getElementById("open");

	//Checkis if UL with id open excists
	if (document.contains(openCityUl)) {
		openCityUl.remove();
	}

	//Create ul element
	let cityUl = document.createElement("ul");
	cityUl.id = "open";

	// Loops through all objects in cityFile
	for (let city in cityFile) {
		if (cityFile[city].countryid == countryId.id) {
			//Create li element
			let cityLi = document.createElement("li");

			//Set id for li element
			cityLi.id = cityFile[city].id;

			//Set Data attribute for li element
			cityLi.setAttribute('data-type', 'city');

			//Set inner HTML for li element
			cityLi.innerHTML = cityFile[city].stadname;

			//Inserts city city li element to city ul element
			cityUl.insertAdjacentElement("beforeend", cityLi);
		}
	}

	//Inserts city ul element to country ul element
	countryUl.insertAdjacentElement("beforeend", cityUl);
}

/**
 *@Description Function that shows city information
 */

export function printInfo(cityInfoArray, e) {
	//Gets the element id
	let infoCont = document.getElementById("infoCont");
	let check = document.getElementById("infoWrapperDiv");


	//Checkis if UL with id open excists
	if (document.contains(check)) {
		check.remove();
	}

	//Create elements
	let infoWrapperDiv = document.createElement("div");
	let imgDiv = document.createElement("div");
	let weatherDiv = document.createElement("div");
	let infoDiv = document.createElement("div");

	let cityH1 = document.createElement("h1");
	let cityH2 = document.createElement("h2");
	let cityP = document.createElement("p");
	let addCityBtn = document.createElement("button");
	addCityBtn.cityId = e.target.id;
	addCityBtn.disabled = isCityVisited(parseInt(e.target.id)) > -1;

	let cityImg = document.createElement("img");

	//Set element id
	infoWrapperDiv.id = "infoWrapperDiv";
	imgDiv.id = "imgDiv";
	weatherDiv.id = "weatherDiv";
	infoDiv.id = "infoDiv";
	addCityBtn.id = "addCity";

	//Set element text
	cityH1.innerHTML = cityInfoArray[0];
	cityH2.innerHTML = "Invånare " + cityInfoArray[1];
	cityP.innerHTML = cityInfoArray[2]
	addCityBtn.innerHTML = isCityVisited(parseInt(e.target.id)) > -1 ? "Besökt" : "Spara Som Besökt";

	// Set img 
	cityImg.src = cityInfoArray[3]
	imgDiv.appendChild(cityImg)

	//Insert elements into infoDiv
	infoDiv.insertAdjacentElement("beforeend", cityH1);
	infoDiv.insertAdjacentElement("beforeend", cityH2);
	infoDiv.insertAdjacentElement("beforeend", cityP);
	infoDiv.insertAdjacentElement("beforeend", addCityBtn);

	//Insert elements and HTML into weatherDiv
	weatherDiv.insertAdjacentHTML("beforeend", "<h2>Temp: " + cityInfoArray[4] + "°C </h1><h3>Feels like: " + cityInfoArray[5] + " °C </h3>");

	//Insert elements into wrapper
	infoWrapperDiv.insertAdjacentElement("beforeend", imgDiv);
	infoWrapperDiv.insertAdjacentElement("beforeend", weatherDiv);
	infoWrapperDiv.insertAdjacentElement("beforeend", infoDiv);

	//Insert elements into section
	infoCont.insertAdjacentElement("beforeend", infoWrapperDiv);
}

export function getCityInfo(cityFile, e) {
	let cityId = e.target.id;
	let cityInfoArray = [];
	let startPage = document.querySelector("main")
	startPage.classList.remove("startPage")

	

	//Lops through all city obj
	for (let city in cityFile) {
		//Checks if city id matches the event
		if (cityFile[city].id == cityId) {
			fetchWikiApi(cityFile[city].stadname).then(data => {//console.log("from fetch module", data),
			fetchWeatherApi(cityFile[city].stadname).then(weatherData => {//console.log("from fetch module", weatherData),

			//Push city name and pupulation to array
			cityInfoArray.push(cityFile[city].stadname),	
			cityInfoArray.push(cityFile[city].population),
			cityInfoArray.push(data.pages[0].excerpt),
			cityInfoArray.push(data.pages[0].thumbnail.url),
			cityInfoArray.push(weatherData.main.temp),
			cityInfoArray.push(weatherData.main.feels_like),
			//console.log(cityInfoArray[4]),
			//console.log(cityInfoArray),

			//console.log(cityFile[city].stadname),
			printInfo(cityInfoArray, e)
			})
			})
			return cityInfoArray;
			break;
			} else {
		}
	}
}
