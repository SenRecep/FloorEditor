"use strict";

$(document).ready(function _callee() {
  var floorBg, optionsLayer, houses, drawHouseElement, drawFloorElement, drawOptionElement, drawOptionItemElement, drawSlectedHouseFloors, drawSlectedFloorOptions, changeFloor, floorDraw, changeOption, OptionDraw, OptionDelete, drawEstimate;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          drawEstimate = function _ref12() {
            var totalOptionEstimate = getOptions().reduce(function (tot, item) {
              return tot + item.Estimate;
            }, 0);
            var floor = getCurrentFloor();
            var total = floor.Estimate + totalOptionEstimate;
            $('#Estimate').text("Estimate: $".concat(total));
          };

          OptionDelete = function _ref11(option) {
            var element = $("#option-item-".concat(option.Id))[0];
            $(element).remove();
          };

          OptionDraw = function _ref10(option) {
            var element = drawOptionItemElement(option);
            $(optionsLayer).append(element);
          };

          changeOption = function _ref9() {
            var _this2 = this;

            var option = getCurrentFloor().Options.find(function (x) {
              return x.Id == _this2.value;
            });

            if (this.checked) {
              var options = getOptions();
              options.push(option);
              setOptions(options);
              OptionDraw(option);
              drawEstimate();
            } else {
              var options = getOptions();
              var index = options.map(function (item) {
                return item.Id;
              }).indexOf(option.Id);
              options.splice(index, 1);
              setOptions(options);
              OptionDelete(option);
              drawEstimate();
            }
          };

          floorDraw = function _ref8(floor) {
            $(floorBg).attr('src', "./assets/img/floors/".concat(floor.Images.Normal));
          };

          changeFloor = function _ref7() {
            var _this = this;

            var floor = getCurrentHouse().Floors.find(function (x) {
              return x.Id == _this.value;
            });
            setCurrentFloor(floor);
            setOptions([]);
            $(optionsLayer).empty();
            drawSlectedFloorOptions();
            floorDraw(floor);
            drawEstimate();
          };

          drawSlectedFloorOptions = function _ref6() {
            $("#options").empty();

            if (getCurrentFloor().Options) {
              getCurrentFloor().Options.forEach(function (option) {
                return $("#options").append(drawOptionElement(option));
              });
              $('input[type=checkbox][name=option]').change(changeOption);
              $('#menu-options').show();
            } else {
              $('#menu-options').hide();
            }
          };

          drawSlectedHouseFloors = function _ref5() {
            $("#floors").empty();
            getCurrentHouse().Floors.forEach(function (floor) {
              return $("#floors").append(drawFloorElement(floor));
            });
            $('input[type=radio][name=floor]')[0].checked = true;
            $('input[type=radio][name=floor]').change(changeFloor);
            setCurrentFloor(getCurrentHouse().Floors[0]);
            floorDraw(getCurrentFloor());
            setOptions([]);
            $(optionsLayer).empty();
            drawSlectedFloorOptions();
            drawEstimate();
          };

          drawOptionItemElement = function _ref4(option) {
            return "<div id=\"option-item-".concat(option.Id, "\" class=\"option-item\" style=\"top: ").concat(option.Normal.Location.Top, ";left: ").concat(option.Normal.Location.Left, ";right: ").concat(option.Normal.Location.Right, ";bottom: ").concat(option.Normal.Location.Bottom, ";height: ").concat(option.Size.Height, "; width: ").concat(option.Size.Width, ";\"> <img src=\"/assets/img/Options/").concat(option.Normal.Image, "\" alt=\"").concat(option.Name, "\"> </div>");
          };

          drawOptionElement = function _ref3(option) {
            return "<li> <a href=\"#\"> <input id=\"option-".concat(option.Id, "\" type=\"checkbox\" value=\"").concat(option.Id, "\" name=\"option\" > <label for=\"option-").concat(option.Id, "\">").concat(option.Name, "</label> </a> </li>");
          };

          drawFloorElement = function _ref2(floor) {
            return "<li> <a href=\"#\"> <input id=\"floor-".concat(floor.Id, "\" type=\"radio\" value=\"").concat(floor.Id, "\" name=\"floor\" > <label for=\"floor-").concat(floor.Id, "\">").concat(floor.Name, "</label> </a> </li>");
          };

          drawHouseElement = function _ref(house) {
            return "<li> <a href=\"#\"> <img src=\"./assets/img/houses/".concat(house.Image, "\" alt=\"").concat(house.Name, "\"/> <input id=\"house-").concat(house.Id, "\" type=\"radio\" value=\"").concat(house.Id, "\" name=\"house\"> <label for=\"house-").concat(house.Id, "\">").concat(house.Name, "</label> </a> </li>");
          };

          floorBg = $('.floor img')[0];
          optionsLayer = $('#options-layer');
          _context.next = 16;
          return regeneratorRuntime.awrap(fetch("db.json").then(function (x) {
            return x.json();
          }));

        case 16:
          houses = _context.sent;
          setCurrentHouse(houses[0]);
          setCurrentFloor(getCurrentHouse().Floors[0]);
          setOptions([]);
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

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
});