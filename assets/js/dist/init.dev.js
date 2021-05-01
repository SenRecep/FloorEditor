"use strict";

var floorBg = $('.floor img')[0];
var optionsLayer = $('#options-layer');

function drawHouseElement(house) {
  return "<li> <span> <a href=\"./assets/img/houses/".concat(house.Image, "\" class=\"lightbox\"><img src=\"./assets/img/houses/").concat(house.Image, "\" alt=\"").concat(house.Name, "\" /></a> <input id=\"house-").concat(house.Id, "\" type=\"radio\" value=\"").concat(house.Id, "\" name=\"house\"> <label for=\"house-").concat(house.Id, "\">").concat(house.Name, "</label> </span> </li>");
}

function drawFloorElement(floor) {
  return "<li> <span> <input id=\"floor-".concat(floor.Id, "\" type=\"radio\" value=\"").concat(floor.Id, "\" name=\"floor\" > <label for=\"floor-").concat(floor.Id, "\">").concat(floor.Name, "</label> </span> </li>");
}

function drawOptionElement(option) {
  return "<li> <span> <div class=\"custom-control custom-switch\"> <input class=\"custom-control-input\" id=\"option-".concat(option.Id, "\" type=\"checkbox\" value=\"").concat(option.Id, "\" name=\"option\" /> <label for=\"option-").concat(option.Id, "\"class=\"custom-control-label\" >").concat(option.Name, "</label> </div> </span> </li>");
}

function drawOptionItemElement(option) {
  return "<div id=\"option-item-".concat(option.Id, "\" class=\"option-item\" > <img  alt=\"").concat(option.Name, "\"> </div>");
}

function drawSlectedHouseFloors() {
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
}

function drawSlectedFloorOptions() {
  $("#options").empty();

  if (getCurrentFloor().Options) {
    getCurrentFloor().Options.forEach(function (option) {
      return $("#options").append(drawOptionElement(option));
    });
    $('input[type=checkbox][name=option]').change(changeOption);
    $("#options li").hover(function () {
      var input = $(this).children().children().children('input')[0];
      $(input).prop("checked", !$(input).prop("checked"));
      $(input).trigger("change");
    }); // $(`#options li`).on('mouseover',function(){
    //     let input=$(this).children().children('input')[0];
    //     if(!input.checked){
    //         input.checked=true;
    //         input.dataset.activeTemp=true;
    //         $(input).trigger("change");
    //     }
    // });
    // $(`#options li`).on('mouseout',function(){
    //       let input=$(this).children().children('input')[0];
    //       if(input.dataset.activeTemp){
    //         input.checked=false;
    //         input.dataset.activeTemp=false;
    //         $(input).trigger("change");
    //       }
    // });
    // $(`#options li`).on('click',function(){
    //     let input=$(this).children().children('input')[0];
    //     console.log(input);
    //     if(input.dataset.activeTemp)
    //        input.dataset.activeTemp=false;
    // });

    $('#menu-options').show();
  } else {
    $('#menu-options').hide();
  }
}

function changeFloor() {
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
}

function floorDraw(floor) {
  $(floorBg).attr('src', "./assets/img/floors/".concat(floor.Images.Normal));
}

function changeOption() {
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
}

function OptionDraw(option) {
  var element = drawOptionItemElement(option);
  $(optionsLayer).append(element);
  drawDirectionOption(option, getFlip());
}

function drawDirectionOption(option, isFlip) {
  var element = $("#option-item-".concat(option.Id))[0];
  var img = $(element).children()[0];
  var prop = isFlip ? "Invers" : "Normal";
  img.setAttribute('src', "/assets/img/Options/".concat(option[prop].Image));
  element.style.top = option[prop].Location.Top;
  element.style.left = option[prop].Location.Left;
  element.style.right = option[prop].Location.Right;
  element.style.bottom = option[prop].Location.Bottom;
  element.style.height = option.Size.Height;
  element.style.width = option.Size.Width;
}

function OptionDelete(option) {
  var element = $("#option-item-".concat(option.Id));
  $(element).remove();
}

function AllOptionDelete() {
  $("input[name='option']:checked").each(function () {
    $(this).prop('checked', false); // Unchecks it)); 
  });
  var options = getOptions();
  options.forEach(function (item) {
    OptionDelete(item);
  });
}

function drawEstimate() {
  var totalOptionEstimate = getOptions().reduce(function (tot, item) {
    return tot + item.Estimate;
  }, 0);
  var floor = getCurrentFloor();
  var total = floor.Estimate + totalOptionEstimate; //$('#Estimate').text(`Estimate: $${total}`);
}

function setImageViewer(houses, house, viewer) {
  var index = houses.indexOf(house);
  viewer.dataset.selectedhouse = index;
  var img = $(viewer).children('img');
  $(img).attr('src', "./assets/img/houses/".concat(house.Image));
  $(img).attr('alt', "./assets/img/houses/".concat(house.Name));
}

function changeSliderImage(slideIndex) {
  var radioButton = $('input[type=radio][name=house]')[slideIndex - 1];
  radioButton.checked = true;
  $(radioButton).trigger("change");
}

$(document).ready(function _callee() {
  var houses, viewer, tobii;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("db.json").then(function (x) {
            return x.json();
          }));

        case 2:
          houses = _context.sent;
          viewer = document.querySelector("div.image-viewer a");
          viewer.dataset.selectedhouse = 0;
          setCurrentHouse(houses[0]);
          setCurrentFloor(getCurrentHouse().Floors[0]);
          setOptions([]);
          setFlip(false);
          houses.forEach(function (house) {
            return $("#houses").append(drawHouseElement(house));
          });
          $('input[type=radio][name=house]').change(function () {
            var _this3 = this;

            var house = houses.find(function (x) {
              return x.Id == _this3.value;
            });
            setImageViewer(houses, house, viewer);
            setCurrentHouse(house);
            drawSlectedHouseFloors();
          });
          drawSlectedHouseFloors();
          changeSliderImage(1);
          tobii = new Tobii({
            counter: false,
            zoom: false,
            captions: false
          });
          tobii.on("open", function () {
            if (tobii.slidesIndex() == 0) {
              var selectedHouse = viewer.dataset.selectedhouse;
              tobii.select(parseInt(selectedHouse) + 1);
            }
          });
          tobii.on("previous", function () {
            if (tobii.slidesIndex() == 0) tobii.select(1);
            changeSliderImage(tobii.slidesIndex());
          });
          tobii.on("next", function () {
            changeSliderImage(tobii.slidesIndex());
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
});