"use strict";

// Github link:
// https://github.com/MaxErixon/MaxErixon-ME132A-U2-2022

// Creates a new stadium with 4 parameters
function createNewStadium(name, team, city, capacity) {
  let stadium = {
    name: name,
    team: team,
    city: city,
    capacity: capacity,
  };
  return stadium;
}

// Adds new stadium to the database of stadiums
function addNewStadiumToDatabase(stadiumDatabase, stadium) {
  stadiumDatabase.push(stadium);
}

// Removes a stadium based on it´s id
function removeStadiumById(stadiumDatabase, id) {
  for (let i = 0; i < stadiumDatabase.length; i++) {
    let stadium = stadiumDatabase[i];
    if (stadium.id == id) {
      stadiumDatabase.splice(i, 1);
      return;
    }
  }
}

// Return stadium based on city
function getStadiumByCity(stadiumDatabase, city) {
  let stadiumByCity = [];

  for (let stadium of stadiumDatabase) {
    if (stadium.city.toLowerCase() == city.toLowerCase()) {
      stadiumByCity.push(stadium);
    }
  }

  return stadiumByCity;
}

// Return stadium based on capacity
function getStadiumByCapacity(stadiumDatabase, capacity) {
  let stadiumbyCapacity = [];

  for (let stadium of stadiumDatabase) {
    if (stadium.capacity == capacity) {
      stadiumbyCapacity.push(stadium);
    }
  }

  return stadiumbyCapacity;
}

// Creates a div with our new stadium and it´s values, and the div is given the class "stadium"
function renderStadium(stadium) {
  let div = document.createElement("div");
  div.classList.add("stadium");
  div.id = stadium.id;

  div.innerHTML = `
        
        <li>${stadium.name}</li>
        <div>${stadium.team}</div>
        <div>${stadium.city}</div>
        <div>${stadium.capacity}</div>
        <button type="button">Remove</button>
    `;

  return div;
}

// Renders an array of the stadiums into our HTML
function renderStadiums(stadiumDatabase) {
  let stadiumsElement = document.getElementById("stadiums");
  stadiumsElement.innerHTML = "";

  for (let stadium of stadiumDatabase) {
    let stadiumElement = renderStadium(stadium);
    stadiumsElement.appendChild(stadiumElement);
  }

  setRemoveStadiumHandlers();
}

// Manages our form with submitting, preventing from sending us to a new page and emptying the input fields
function onAddStadiumSubmit(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let team = document.getElementById("team").value;
  let city = document.getElementById("city").value;
  let capacity = Number(document.getElementById("capacity").value);

  let stadium = createNewStadium(name, team, city, capacity);

  // Using "if" to return a alert if any of the input fields are missing info
  if (name == "") {
    return alert("You have to provide all the info ");
  } else if (team == "") {
    return alert("You have to provide all the info ");
  } else if (city == "") {
    return alert("You have to provide all the info ");
  } else if (capacity == "") {
    return alert("You have to provide all the info ");
  }

  stadium.id = stadiumDatabase[stadiumDatabase.length - 1].id + 1;

  addNewStadiumToDatabase(stadiumDatabase, stadium);
  renderStadiums(stadiumDatabase);

  let form = document.getElementById("add-stadium-form");
  form.reset();
}

// Adding eventlistener to our adding button
function setAddStadiumHandler() {
  let form = document.getElementById("add-stadium-form");
  form.addEventListener("submit", onAddStadiumSubmit);
}

// Function for when remove-button is clicked
function onRemoveStadiumClick(event) {
  let button = event.target;
  let id = button.parentElement.id;

  // Using "if" to return a confirm function to make sure the user really wants to delete a object
  if (confirm("Are you sure you want to delete the stadium?") == true) {
    removeStadiumById(stadiumDatabase, id);
  } else return false;

  renderStadiums(stadiumDatabase);
}

// Adding eventlistener to the remove-buttons
function setRemoveStadiumHandlers() {
  let buttons = document.querySelectorAll(".stadium button");

  for (let button of buttons) {
    button.addEventListener("click", onRemoveStadiumClick);
  }
}

// Filter stadiums by city
function onFilterByCitySubmit(event) {
  event.preventDefault();
  let city = document.getElementById("filter-city").value;
  let stadiums = getStadiumByCity(stadiumDatabase, city);
  renderStadiums(stadiums);
}

// Filter stadiums by capacity
function onFilterByCapacitySubmit(event) {
  event.preventDefault();
  let capacity = document.getElementById("filter-capacity").value;
  let stadiums = getStadiumByCapacity(stadiumDatabase, capacity);
  renderStadiums(stadiums);
}

// Show all objects after using a filter
function onShowAllClick() {
  document.getElementById("filter-city").value = "";
  document.getElementById("filter-capacity").value = "";
  renderStadiums(stadiumDatabase);
}

// Adding eventlistener to the filter and "show all" button
function setFilterStadiumHandlers() {
  let cityForm = document.getElementById("filter-by-city");
  let capacityForm = document.getElementById("filter-by-capacity");
  let showAll = document.getElementById("show-all");

  cityForm.addEventListener("submit", onFilterByCitySubmit);
  capacityForm.addEventListener("submit", onFilterByCapacitySubmit);
  showAll.addEventListener("click", onShowAllClick);
}

// Direct code for the page to be properly loaded
renderStadiums(stadiumDatabase);
setAddStadiumHandler();
setFilterStadiumHandlers();
