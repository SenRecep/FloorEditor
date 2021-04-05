
function setCurrentHouse(val) {
    localStorage.setItem("currentHouse", JSON.stringify(val));
}

function setCurrentFloor(val) {
    localStorage.setItem("currentFloor", JSON.stringify(val));
}


function setOptions(val) {
    localStorage.setItem("Options", JSON.stringify(val));
}

function setFlip(val) {
    localStorage.setItem("Flip", JSON.stringify(val));
}




function getCurrentHouse() {
    return JSON.parse(localStorage.getItem("currentHouse"));
}

function getCurrentFloor() {
    return JSON.parse(localStorage.getItem("currentFloor"));
}

function getOptions() {
    return JSON.parse(localStorage.getItem("Options"));
}

function getFlip() {
    return JSON.parse(localStorage.getItem("Flip"));
}