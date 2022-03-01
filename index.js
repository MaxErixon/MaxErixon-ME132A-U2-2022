"use strict";

function createNewStadium(name, team, city, capacity) {
    
    let stadium = {
        name: name,
        team: team,
        city: city,
        capacity: capacity,
    }
    return stadium;
}

function addNewStadiumToDatabase(stadiumDatabase, stadium) {
    stadiumDatabase.push(stadium);
}

function removeStadiumById(stadiums) {
    for ( let i = 0; i < stadiumDatabase.length; i++){
        let stadium = stadiumDatabase[i];
        if (stadium.id == id){
            stadiumDatabase.splice(i,1);
            return;
        }
    }
    
}

function getStadiumbyCity(stadiumDatabase, city) {
    let stadiumByCity= [];

    for (let stadium of stadiumDatabase) {
        if (stadium.city.toLowerCase() == city.toLowerCase()) {
            stadiumByCity.push(stadium);
        }
    }

    return stadiumByCity;
}

function getStadiumbyCapacity(stadiumDatabase, capacity) {
    let stadiumbyCapacity= [];

    for (let stadium of stadiumDatabase) {
        if (stadium.capacity == capacity) {
            stadiumbyCapacity.push(stadium);
        }
    }

    return stadiumbyCapacity;
}

function renderStadium(stadium) {
    let div = document.createElement("div");
    div.classList.add("stadium");
    div.id = stadium.id;

    div.innerHTML = `
        <div>${stadium.name}</div>
        <div>${stadium.breed}</div>
        <div>${stadium.age}</div>
        <button type="button">Remove</button>
    `;

    return div;
}

function renderStadiums(stadiums) {
    let stadiumsElement = document.getElementById("stadiums");
    stadiumsElement.innerHTML = "";

    
    for (let stadium of stadiumDatabase) {
        let stadiumElement = renderStadium(stadium);
        stadiumsElement.appendChild(stadiumElement);
    }

    setRemoveStadiumHandlers();
}


function onAddStadiumSubmit(event) {
    
    event.preventDefault();

    let name = document.getElementById("name").value;
    let team = document.getElementById("team").value;
    let city = document.getElementById("city").value;
    let capacity = Number(document.getElementById("capacity").value);

    let stadium = createNewStadium(name, team, city, capacity);

    
    stadium.id = stadiumDatabase[stadiumDatabase.length - 1].id + 1;

    addStadiumToDatabase(stadiumDatabase, stadium)
    renderStadiums(stadiumDatabase);

    
    let form = document.getElementById("add-stadium-form");
    form.reset();
}

function setAddStadiumHandler() {
    let form = document.getElementById("add-stadium-form");
    form.addEventListener("submit", onAddStadiumSubmit);
}

function onRemoveStadiumClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
   
    removeStadiumById(stadiumDatabase, id);
    
    renderStadiums(stadiumDatabase);
}

function setRemoveStadiumHandlers() {
    let buttons = document.querySelectorAll(".stadium button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveStadiumClick);
    }
}

function onFilterByCitySubmit(event) {
    event.preventDefault();
    let city = document.getElementById("filter-city").value;
    let stadiums = getStadiumbyCity(stadiumDatabase, city);
    renderStadiums(stadiums);
}

function onFilterByCapacitySubmit(event) {
    event.preventDefault();
    let capacity = document.getElementById("filter-capacity").value;
    let stadiums = getStadiumbyCapacity(stadiumDatabase, capacity);
    renderStadiums(stadiums);
}

function onShowAllClick() {
    document.getElementById("filter-city").value = "";
    document.getElementById("filter-capacity").value = "";
    renderStadiums(stadiumDatabase);
}

function setFilterStadiumHandlers() {
    let cityForm = document.getElementById("filter-by-city");
    let capacityForm = document.getElementById("filter-by-capacity");
    let showAll = document.getElementById("show-all");

    cityForm.addEventListener("submit", onFilterByCitySubmit);
    capacityForm.addEventListener("submit", onFilterByCapacitySubmit);
    showAll.addEventListener("click", onShowAllClick);
}

renderStadiums(stadiumDatabase);
setAddStadiumHandler();
setFilterStadiumHandlers();