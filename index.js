"use strict";

function createNewStaidum(name, team, city, capacity) {
    
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