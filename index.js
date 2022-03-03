"use strict";

function createNewStadium(name, team, city, capacity) {
  let stadium = {
    name: name,
    team: team,
    city: city,
    capacity: capacity,
  };
  return stadium;
}

function addNewStadiumToDatabase(stadiumDatabase, stadium) {
  stadiumDatabase.push(stadium);
}

function removeStadiumById(stadiumDatabase, id) {
  for (let i = 0; i < stadiumDatabase.length; i++) {
    let stadium = stadiumDatabase[i];
    if (stadium.id == id) {
      stadiumDatabase.splice(i, 1);
      return;
    }
  }
}

function getStadiumByCity(stadiumDatabase, city) {
  let stadiumByCity = [];

  for (let stadium of stadiumDatabase) {
    if (stadium.city == city) {
      stadiumByCity.push(stadium);
    }
  }

  return stadiumByCity;
}

function getStadiumByCapacity(stadiumDatabase, capacity) {
  let stadiumbyCapacity = [];

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
        
        <li>${stadium.name}</li>
        <div>${stadium.team}</div>
        <div>${stadium.city}</div>
        <div>${stadium.capacity}</div>
        <button type="button">Remove</button>
    `;

  return div;
}

function renderStadiums(stadiumDatabase) {
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

function setAddStadiumHandler() {
  let form = document.getElementById("add-stadium-form");
  form.addEventListener("submit", onAddStadiumSubmit);
}

function onRemoveStadiumClick(event) {
  let button = event.target;
  let id = button.parentElement.id;

  if (confirm("Are you sure you want to delete the stadium?") == true) {
    removeStadiumById(stadiumDatabase, id);
  } else return false;

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
  let stadiums = getStadiumByCity(stadiumDatabase, city);
  renderStadiums(stadiums);
}

function onFilterByCapacitySubmit(event) {
  event.preventDefault();
  let capacity = document.getElementById("filter-capacity").value;
  let stadiums = getStadiumByCapacity(stadiumDatabase, capacity);
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



  function btn() {
     let knapp = document.getElementById("btn");
     knapp.addEventListener("click", function play() {
        var audio = document.getElementById("audio");
        audio.play();
     })

  }

renderStadiums(stadiumDatabase);
setAddStadiumHandler();
setFilterStadiumHandlers();
