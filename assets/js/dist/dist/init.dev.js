"use strict";

$(document).ready(function _callee() {
  var wrapperElement, editorElement, houses, currentHouse, drawHouseElement;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          drawHouseElement = function _ref(house) {
            return "<li> <a href=\"#\"> <img src=\"./assets/img/houses/".concat(house.Image, "\" alt=\"").concat(house.Name, "\"/> <input id=\"house-").concat(house.Id, "\" type=\"radio\" value=\"").concat(house.Id, "\" name=\"house\"> <label for=\"house-").concat(house.Id, "\">").concat(house.Name, "</label> </a> </li>");
          };

          wrapperElement = document.getElementById("wrapper");
          editorElement = document.getElementById("editor");
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("db.json").then(function (x) {
            return x.json();
          }));

        case 5:
          houses = _context.sent;
          currentHouse = houses[0];
          console.log(currentHouse);
          houses.forEach(function (house) {
            return $("#houses").append(drawHouseElement(house));
          });
          $('input[type=radio][name=house]')[0].checked = true;
          $('input[type=radio][name=house]').change(function () {
            alert(this.value);
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});