/**
 *@Description Fetch
 */

export function fetchJson() {

  Promise.all([
      //Fetch JSON-Files
      fetch("land.json").then(response => response.json()),
      fetch("stad.json").then(response => response.json())
    ])

    .then(data => {setLocalStorage(data)})
};


/**
 *@Description Set data to Local Storage
 */

function setLocalStorage(data) {

  let landFile = data[0]
  let stadFile = data[1]

  localStorage.setItem("landFile", JSON.stringify(landFile));
  localStorage.setItem("stadFile", JSON.stringify(stadFile));
}

/**
 *@Description Fetches wikipedia data
 */

export function fetchWikiApi(city) {

  let result = fetch(`https://sv.wikipedia.org/w/rest.php/v1/search/page?q=$${city}&limit=1`)
  .then((response) => response.json())
  .then(function(data){ 
    return data;
  });
  return result;
};

 export function fetchWeatherApi(city) {
  let output = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9aa18a6b7d30ac18a77d43c12439d896`)
      .then((response) => response.json())
      .then(function(weatherData){ 
        return weatherData;
      });
      return output;
   };