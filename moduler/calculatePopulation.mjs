// Exporterar till storedCities funktionen för att räkna ut antalet invånare
export function calculatePopulation(visitedCity) {
  // Testar så att visitedCity från StoredCities laddas in ordentligt
  let cityFile = JSON.parse(localStorage.getItem("stadFile"));

  let visitedArray = [];

  cityFile.forEach(element => {
    for (const key in visitedCity) {
      if (element.id == visitedCity[key]) {
        visitedArray.push(element.population)
      }
    }
  });


  let populationDisplay = document.createElement("div");
  document.getElementById("visited").appendChild(populationDisplay);

  // // Här startar jag min uträkning för antalet invånare i besökta städer
  let sum = 0;
  for (const key in visitedArray) {
    // För varje land så läggs den nya populationen till
    sum += visitedArray[key];
  }
  
  // Här konverterar jag siffrorna till en string så att den får mellanslag så att den blir lättare att läsa
  let result = sum.toLocaleString();

  // Här lägger jag summan i fetstil nedanför städerna som är besökta
  populationDisplay.insertAdjacentHTML("beforeend", `Totalt: <br>${result} st invånare`);

}