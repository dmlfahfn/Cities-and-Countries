// import { calculatePopulation } from "./calculatePopulation.mjs";
import { calculatePopulation } from "../script.js";

const localStorageKey = "visitedCity";

// Hämtar aside-elementet som listan ska skrivas ut i.
const visitedContainer = document.getElementById("visited");
// Varnar om id ändrats i index.html
if (!visitedContainer) {
	console.error("storedCities: element 'visited' not found");
}

let cities;

// Funktion för att hämta sparade städer från localStorage
export function getSavedCities() {
	const storedEntry = JSON.parse(localStorage.getItem(localStorageKey));
	return storedEntry ? storedEntry : [];
}

// Funktion för att spara stad
export function saveCity(newCityId) {
	const oldList = getSavedCities();
	const newList = oldList.concat(newCityId);
	// https://dzone.com/articles/ways-to-combine-arrays-in-javascript
	localStorage.setItem(localStorageKey, JSON.stringify(newList));

	render();
}

// Funktion för att ta bort hela listan med sparade städer
function clearAll() {
	localStorage.removeItem(localStorageKey);
	reEnableButtonAlways();
	render();
}

export function isCityVisited(cityId) {
	const oldList = getSavedCities();
	const inArray = oldList.indexOf(cityId);
	return inArray;
}

// Funktion för att ta bort en stad i taget (som i skissen)
function removeCity(removeCityId) {
	const inArray = isCityVisited(removeCityId);	
	if (inArray > -1) {
		reEnableButtonMaybe(removeCityId);
		const oldList = getSavedCities();
		const newList = oldList;
		newList.splice(inArray, 1);
		localStorage.setItem(localStorageKey, JSON.stringify(newList));
	}
	render();
}

function reEnableButtonMaybe(cityId) {
	const addCityBtn = document.getElementById("addCity");
	// har vi 'stadsdetaljvyn' öppen
	if (addCityBtn && parseInt(addCityBtn.cityId) === cityId) {
		addCityBtn.disabled = false;
		addCityBtn.innerHTML = "Spara som besökt";
	}
}

function reEnableButtonAlways() {
	const addCityBtn = document.getElementById("addCity");
	if (addCityBtn) {
		addCityBtn.disabled = false;
		addCityBtn.innerHTML = "Spara som besökt";
	}
}

// Hitta rätt stad från datafilen via id-jämförelse
function getCityById(id) {
	const foundcity = cities.find(function (city) {
		return id === city.id;
	});
	return foundcity;
}

// Här borde funktionen för räkna invånare in?
// Ritar ut titel (Besökt), städernas namn och ev. ta-bort-knapp per stad.
export function render() {
	if (!cities) {
		cities = JSON.parse(localStorage.getItem("stadFile"));
		// Varnar om localStorage inte har rätt nyckel
		if (!cities) {
			console.error("storedCities: localStorage 'stadFile' not found");
		}		
	}
	visitedContainer.innerText = "";

	const header = document.createElement("h1");
	header.id = "visitedHeader";
	header.innerText = "Besökt:";
	visitedContainer.appendChild(header);

	const savedCities = getSavedCities();
	for (const savedCityId of savedCities) {
		const cityObj = getCityById(savedCityId);

		const itemElem = document.createElement("div");
		itemElem.className = "visitedItem";
		visitedContainer.appendChild(itemElem);

		const cityName = document.createElement("span");
		cityName.className = "savedCityName";
		cityName.innerText = cityObj.stadname;
		itemElem.appendChild(cityName);

		const removeCityButton = document.createElement("button");
		removeCityButton.className = "removeCityButton";
		removeCityButton.innerText = "x";
		removeCityButton.cityId = cityObj.id;
		removeCityButton.onclick = function () {
			removeCity(this.cityId);
		};
		itemElem.appendChild(removeCityButton);
	};
	// Ritar ut ta-bort-allt-knapp, men bara om det finns städer att ta bort.
	if (savedCities.length > 0) {
		const removeAllButton = document.createElement("button");
		removeAllButton.className = "removeAllButton";
		removeAllButton.innerText = "Töm lista";
		removeAllButton.onclick = clearAll;
		visitedContainer.appendChild(removeAllButton);
	}
	calculatePopulation(savedCities);
}

// render();
