const floorBg = $('.floor img')[0];

const optionsLayer = $('#options-layer')[0];

function setOptionLayerProperties() {
    optionsLayer.style.position = "absolute";
    optionsLayer.style.width = "100%";
    optionsLayer.style.height = "100%";
    optionsLayer.style.left = 0;
    optionsLayer.style.top = 0;
}

function drawHouseElement(house) {

    return `<li> <span> <a href="./assets/img/houses/${house.Image}" class="lightbox"><img src="./assets/img/houses/${house.Image}" alt="${house.Name}" /></a> <input id="house-${house.Id}" type="radio" value="${house.Id}" name="house"> <label for="house-${house.Id}">${house.Name}</label> <i class="fas fa-check"></i> </span> </li>`;
}
function drawFloorElement(floor) {
    return `<li> <span> <input id="floor-${floor.Id}" type="radio" value="${floor.Id}" name="floor" > <label for="floor-${floor.Id}">${floor.Name}</label>  <i class="fas fa-check"></i> </span> </li>`;
}
function drawOptionElement(option) {

    return `<li data-hoverevent='true'> <span> <div class="custom-control custom-switch"> <input class="custom-control-input" id="option-${option.Id}" type="checkbox" value="${option.Id}" name="option" /> <label for="option-${option.Id}"class="custom-control-label" >${option.Name}</label> </div> </span> </li>`;
}

function drawOptionItemElement(option) {
    return `<div id="option-item-${option.Id}" class="option-item" > <img  alt="${option.Name}"> </div>`;
}


function drawSlectedHouseFloors() {
    $("#floors").empty();
    getCurrentHouse().Floors.forEach(floor => $("#floors").append(drawFloorElement(floor)));
    $('input[type=radio][name=floor]')[0].checked = true;
    $('input[type=radio][name=floor]').change(changeFloor);
    setCurrentFloor(getCurrentHouse().Floors[0]);
    floorDraw(getCurrentFloor())
    setOptions([]);
    $(optionsLayer).empty();
    drawSlectedFloorOptions();
    drawEstimate();
}


function optionHoverEvent() {
    let input = $(this).children().children().children('input')[0];
    $(input).prop("checked", !$(input).prop("checked"));
    $(input).trigger("change");
}

function drawSlectedFloorOptions() {
    $("#options").empty();
    if (getCurrentFloor().Options) {
        getCurrentFloor().Options.forEach(option => $("#options").append(drawOptionElement(option)));
        $('input[type=checkbox][name=option]').change(changeOption);
        $('input[type=checkbox][name=option]').click(function (e) {
            var li=  $(this).parent().parent().parent().get(0);
            console.log(this.checked);
            if (this.checked == false) {
                if (li.dataset.hoverevent=='true'){
                   e.preventDefault();
                    li.dataset.hoverevent='false';
                    $(li).unbind();
                   
                }
                else{
                    $('#options li').on('mouseleave',function(){
                        li.dataset.hoverevent='true';
                        $(this).unbind();
                        $(this).hover(optionHoverEvent);
                    });
                }
             
            }
        });
        
        $("#options li").hover(optionHoverEvent);
        $('#menu-options').show();
    }
    else {
        $('#menu-options').hide();
    }
}


function changeFloor() {
    var floor = getCurrentHouse().Floors.find(x => x.Id == this.value);
    setCurrentFloor(floor);
    setOptions([]);
    $(optionsLayer).empty();
    drawSlectedFloorOptions();
    floorDraw(floor);
    drawEstimate();
}

function floorDraw(floor) {
    $(floorBg).attr('src', `./assets/img/floors/${floor.Images.Normal}`);
}

function changeOption() {
    var option = getCurrentFloor().Options.find(x => x.Id == this.value);
    if (this.checked) {

        var options = getOptions();
        options.push(option);
        setOptions(options);
        OptionDraw(option);
        drawEstimate();
    } else {
        var options = getOptions();
        var index = options.map((item) => item.Id).indexOf(option.Id);
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
    var element = $(`#option-item-${option.Id}`)[0];
    var img = $(element).children()[0];
    var prop = isFlip ? "Invers" : "Normal";
    img.setAttribute('src', `/assets/img/Options/${option[prop].Image}`);
    element.style.position = "absolute";
    element.style.top = option[prop].Location.Top;
    element.style.left = option[prop].Location.Left;
    element.style.right = option[prop].Location.Right;
    element.style.bottom = option[prop].Location.Bottom;
    element.style.height = option.Size.Height;
    element.style.width = option.Size.Width;
}

function OptionDelete(option) {
    var element = $(`#option-item-${option.Id}`);
    $(element).remove();
}

function AllOptionDelete() {
    $("input[name='option']:checked").each(function () {
        $(this).prop('checked', false); // Unchecks it)); 
    });
    let options = getOptions();
    options.forEach(item => {
        OptionDelete(item);
    });

}



function drawEstimate() {
    var totalOptionEstimate = getOptions().reduce((tot, item) => tot + item.Estimate, 0);
    var floor = getCurrentFloor();
    var total = floor.Estimate + totalOptionEstimate;
    //$('#Estimate').text(`Estimate: $${total}`);
}


function setImageViewer(houses, house, viewer) {
    var index = houses.indexOf(house);
    viewer.dataset.selectedhouse = index;
    var img = $(viewer).children('img');
    $(img).attr('src', `./assets/img/houses/${house.Image}`);
    $(img).attr('alt', `./assets/img/houses/${house.Name}`);
}


function changeSliderImage(slideIndex) {
    var radioButton = $('input[type=radio][name=house]')[slideIndex - 1];
    radioButton.checked = true;
    $(radioButton).trigger("change");
}


$(document).ready(async function () {
    const houses = await fetch("db.json").then(x => x.json());
    const viewer = document.querySelector("div.image-viewer a");
    viewer.dataset.selectedhouse = 0;

    setCurrentHouse(houses[0]);
    setCurrentFloor(getCurrentHouse().Floors[0]);
    setOptions([]);
    setFlip(false);


    houses.forEach(house => $("#houses").append(drawHouseElement(house)));

    $('input[type=radio][name=house]').change(function () {
        var house = houses.find(x => x.Id == this.value);
        setImageViewer(houses, house, viewer);
        setCurrentHouse(house);
        drawSlectedHouseFloors();
    });
    drawSlectedHouseFloors();

    changeSliderImage(1);

    setOptionLayerProperties();


    const tobii = new Tobii({
        counter: false,
        zoom: false,
        captions: true
    });

    tobii.on("open", function () {
        if (tobii.slidesIndex() == 0) {
            var selectedHouse = viewer.dataset.selectedhouse;
            tobii.select(parseInt(selectedHouse) + 1);
        }
    });



    tobii.on("previous", function () {
        if (tobii.slidesIndex() == 0)
            tobii.select(1);
        changeSliderImage(tobii.slidesIndex());
    });


    tobii.on("next", function () {
        changeSliderImage(tobii.slidesIndex());
    })
});



