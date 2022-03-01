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

    // Go through all dogs and insert their HTML
    for (let stadium of stadiumDatabase) {
        let stadiumElement = renderstadium(stadium);
        stadiumsElement.appendChild(stadiumElement);
    }
    // Add remove-handlers for our dogs
    setRemoveStadiumHandlers();
}


function onAddStadiumSubmit(event) {
    // Prevent the form from sending us to a new page
    event.preventDefault();

    let name = document.getElementById("name").value;
    let team = document.getElementById("team").value;
    let city = document.getElementById("city").value;
    let capacity = Number(document.getElementById("capacity").value);

    let stadium = createNewStadium(name, team, city, capacity);

    // Calculate the newly created dogs ID
    stadium.id = stadiumDatabase[stadiumDatabase.length - 1].id + 1;

    addStadiumToDatabase(stadiumDatabase, stadium)
    renderStadiums(stadiumDatabase);

    // Reset (empty) all form fields
    let form = document.getElementById("add-stadium-form");
    form.reset();
}