"use strict";

$(document).ready(function _callee() {
  var floorBg, houses, drawHouseElement, drawFloorElement, drawOptionElement, drawSlectedHouseFloors, drawSlectedFloorOptions, changeFloor, floorDraw, changeOption, OptionDraw, drawEstimate;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          drawEstimate = function _ref10() {
            var option = getCurrentOption();
            var floor = getCurrentFloor();

            if (option) {
              $('#Estimate').text("Estimate: $".concat(option.Estimate));
            } else if (floor) {
              $('#Estimate').text("Estimate: $".concat(floor.Estimate));
            }
          };

          OptionDraw = function _ref9(option) {
            $(floorBg).attr('src', "./assets/img/floors/".concat(option.Images.Normal));
          };

          changeOption = function _ref8() {
            var _this2 = this;

            var option = getCurrentFloor().Options.find(function (x) {
              return x.Id == _this2.value;
            });
            setCurrentOption(option);
            OptionDraw(option);
            drawEstimate();
          };

          floorDraw = function _ref7(floor) {
            $(floorBg).attr('src', "./assets/img/floors/".concat(floor.Images.Normal));
          };

          changeFloor = function _ref6() {
            var _this = this;

            var floor = getCurrentHouse().Floors.find(function (x) {
              return x.Id == _this.value;
            });
            setCurrentFloor(floor);
            setCurrentOption(null);
            drawSlectedFloorOptions();
            floorDraw(floor);
            drawEstimate();
          };

          drawSlectedFloorOptions = function _ref5() {
            $("#options").empty();

            if (getCurrentFloor().Options) {
              getCurrentFloor().Options.forEach(function (option) {
                return $("#options").append(drawOptionElement(option));
              });
              $('input[type=radio][name=option]').change(changeOption);
              $('#menu-options').show();
            } else {
              $('#menu-options').hide();
            }
          };

          drawSlectedHouseFloors = function _ref4() {
            $("#floors").empty();
            getCurrentHouse().Floors.forEach(function (floor) {
              return $("#floors").append(drawFloorElement(floor));
            });
            $('input[type=radio][name=floor]')[0].checked = true;
            $('input[type=radio][name=floor]').change(changeFloor);
            setCurrentFloor(getCurrentHouse().Floors[0]);
            floorDraw(getCurrentFloor());
            setCurrentOption(null);
            drawSlectedFloorOptions();
            drawEstimate();
          };

          drawOptionElement = function _ref3(option) {
            return "<li> <a href=\"#\"> <input id=\"option-".concat(option.Id, "\" type=\"radio\" value=\"").concat(option.Id, "\" name=\"option\" > <label for=\"option-").concat(option.Id, "\">").concat(option.Name, "</label> </a> </li>");
          };

          drawFloorElement = function _ref2(floor) {
            return "<li> <a href=\"#\"> <input id=\"floor-".concat(floor.Id, "\" type=\"radio\" value=\"").concat(floor.Id, "\" name=\"floor\" > <label for=\"floor-").concat(floor.Id, "\">").concat(floor.Name, "</label> </a> </li>");
          };

          drawHouseElement = function _ref(house) {
            return "<li> <a href=\"#\"> <img src=\"./assets/img/houses/".concat(house.Image, "\" alt=\"").concat(house.Name, "\"/> <input id=\"house-").concat(house.Id, "\" type=\"radio\" value=\"").concat(house.Id, "\" name=\"house\"> <label for=\"house-").concat(house.Id, "\">").concat(house.Name, "</label> </a> </li>");
          };

          floorBg = $('.floor img')[0];
          _context.next = 13;
          return regeneratorRuntime.awrap(fetch("db.json").then(function (x) {
            return x.json();
          }));

        case 13:
          houses = _context.sent;
          console.log(floorBg);
          setCurrentHouse(houses[0]);
          setCurrentFloor(getCurrentHouse().Floors[0]);
          setCurrentOption(null);
          houses.forEach(function (house) {
            return $("#houses").append(drawHouseElement(house));
          });
          $('input[type=radio][name=house]').change(function () {
            var _this3 = this;

            var house = houses.find(function (x) {
              return x.Id == _this3.value;
            });
            setCurrentHouse(house);
            drawSlectedHouseFloors();
          });
          drawSlectedHouseFloors();
          drawSlectedFloorOptions();
          $('input[type=radio][name=house]')[0].checked = true;

        case 23:
        case "end":
          return _context.stop();
      }
    }
  });
});