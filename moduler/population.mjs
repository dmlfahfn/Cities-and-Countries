


export function getPopulation(cityFile, e) {


    

for (let pop in cityFile) {
    if (document.getElementById("open")) {
        let clickedCityId = e.target.id;
        //console.log(clickedCityId);
        if (clickedCityId == cityFile[pop].id) {
            //console.log(cityFile[pop].id);
            //console.log(cityFile[pop].population);
            let p = document.createElement("p");
            p.innerHTML = cityFile[pop].population;
            let cityInfo = document.getElementById("city-info");
            cityInfo.insertAdjacentElement("beforeend", p) }
    } else {
        // printCitys(cityFile);
    }
}
}