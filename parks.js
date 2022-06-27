

class City {
    constructor (id, city) {
        this.id = id;
        this.city = city;
        this.parks = [];
    }

}

class Park {
    constructor (park, lake, fish) {
        this.park = park;
        this.lake = lake;
        this.fish = fish;
    }
}

let cities = [];
let citiesId = 0;

onClick('new-city', () => {
    cities.push(new City(citiesId++, getValue('new-city-name')));
    drawDom();
})

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
} 

function drawDom() {
    let cityDiv = document.getElementById('cities');
    clearElement(cityDiv);
    for (cityName of cities) { // iterate through the cities
        let table = createCityTable(cityName);
        let title = document.createElement('h2');
        title.innerHTML = cityName.city;
        title.appendChild(createDeleteCityButton(cityName));
        cityDiv.appendChild(title);
        cityDiv.appendChild(table);
        for (parkName of cityName.parks) { // iterate through the parks
                createParkRow(cityName, table, parkName);            
        }; 
    };
}

function createParkRow (cityName, table, parkName) { //create a park entry
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = parkName.park;
    row.insertCell(1).innerHTML = parkName.lake;
    row.insertCell(2).innerHTML = parkName.fish;
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton(cityName, parkName));  
    
}

function createDeleteRowButton(cityName, parkName) { // delete park entry
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = cityName.parks.indexOf(parkName);
        cityName.parks.splice(index, 1);
        drawDom();
    };
    return btn;
}

function createDeleteCityButton(cityName) { //delete city
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete City';
    btn.onclick = () => {
        let index = cities.indexOf(cityName);
        cities.splice(index, 1);
        drawDom();
    };
    return btn;
}

function createNewParkButton(city) {
    let btn = document.createElement('button');
    btn.className ='btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        city.parks.push(new Park(getValue(`park-input-${city.id}`), getValue(`lake-input-${city.id}`), getValue(`fish-input-${city.id}`)));
        drawDom();
    };
    return btn;
}

function createCityTable(city) { // making a table for the park, lake and fish entries
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let parkColumn = document.createElement('th');
    let lakeColumn = document.createElement('th');
    let fishColumn = document.createElement('th');
    parkColumn.innerHTML = 'Park';
    lakeColumn.innerHTML = 'Lake';
    fishColumn.innerHTML = 'Fish (Use(,) to add more fish)';
    row.appendChild(parkColumn);
    row.appendChild(lakeColumn);
    row.appendChild(fishColumn);
    let formRow = table.insertRow(1); // create a row for the park, lake and fish entries
    let parkTh = document.createElement('th');
    let lakeTh = document.createElement('th');
    let fishTh = document.createElement('th')
    let createTh = document.createElement('th');
    let parkInput = document.createElement('input');
    parkInput.setAttribute('id', `park-input-${city.id}`);
    parkInput.setAttribute('type', 'text');
    parkInput.setAttribute('class', 'form-control');
    let lakeInput = document.createElement('input');
    lakeInput.setAttribute('id', `lake-input-${city.id}`);
    lakeInput.setAttribute('type', 'text');
    lakeInput.setAttribute('class', 'form-control');
    let fishInput = document.createElement('input');
    fishInput.setAttribute('id', `fish-input-${city.id}`);
    fishInput.setAttribute('type', 'text');
    fishInput.setAttribute('class', 'form-control');
    let newParkButton = createNewParkButton(city);
    parkTh.appendChild(parkInput);
    lakeTh.appendChild(lakeInput);
    fishTh.appendChild(fishInput);
    createTh.appendChild(newParkButton);
    formRow.appendChild(parkTh);
    formRow.appendChild(lakeTh);
    formRow.appendChild(fishTh);
    formRow.appendChild(createTh);
    return table;

}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}