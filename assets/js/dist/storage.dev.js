"use strict";

function setCurrentHouse(val) {
  localStorage.setItem("currentHouse", JSON.stringify(val));
}

function setCurrentFloor(val) {
  localStorage.setItem("currentFloor", JSON.stringify(val));
}

function setCurrentOption(val) {
  localStorage.setItem("currentOption", JSON.stringify(val));
}

function getCurrentHouse() {
  return JSON.parse(localStorage.getItem("currentHouse"));
}

function getCurrentFloor() {
  return JSON.parse(localStorage.getItem("currentFloor"));
}

function getCurrentOption() {
  return JSON.parse(localStorage.getItem("currentOption"));
}