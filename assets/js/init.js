$(document).ready(async function () {

    const floorBg = $('.floor img')[0];

    const optionsLayer=$('#options-layer');
    
    const houses = await fetch("db.json").then(x => x.json());
    
     setCurrentHouse(houses[0]);
     setCurrentFloor(getCurrentHouse().Floors[0]);
     setOptions([]);

    function drawHouseElement(house) {
        return `<li> <a href="#"> <img src="./assets/img/houses/${house.Image}" alt="${house.Name}"/> <input id="house-${house.Id}" type="radio" value="${house.Id}" name="house"> <label for="house-${house.Id}">${house.Name}</label> </a> </li>`;
    }
    function drawFloorElement(floor) {
        return `<li> <a href="#"> <input id="floor-${floor.Id}" type="radio" value="${floor.Id}" name="floor" > <label for="floor-${floor.Id}">${floor.Name}</label> </a> </li>`;
    }
    function drawOptionElement(option) {
        return `<li> <a href="#"> <input id="option-${option.Id}" type="checkbox" value="${option.Id}" name="option" > <label for="option-${option.Id}">${option.Name}</label> </a> </li>`;
    }

    function drawOptionItemElement(option) {
        return `<div id="option-item-${option.Id}" class="option-item" style="top: ${option.Normal.Location.Top};left: ${option.Normal.Location.Left};right: ${option.Normal.Location.Right};bottom: ${option.Normal.Location.Bottom};height: ${option.Size.Height}; width: ${option.Size.Width};"> <img src="/assets/img/Options/${option.Normal.Image}" alt="${option.Name}"> </div>`;
    }

    function drawSlectedHouseFloors(){
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

    function drawSlectedFloorOptions(){
        $("#options").empty();
        if(getCurrentFloor().Options)
        {
            getCurrentFloor().Options.forEach(option => $("#options").append(drawOptionElement(option)));
            $('input[type=checkbox][name=option]').change(changeOption);
            $('#menu-options').show();
        }
        else{
            $('#menu-options').hide();
        }
    }

    function changeFloor(){
        var floor=getCurrentHouse().Floors.find(x=>x.Id==this.value);
        setCurrentFloor(floor);
        setOptions([]);
        $(optionsLayer).empty();
        drawSlectedFloorOptions();
        floorDraw(floor);
        drawEstimate();
    }

    function floorDraw(floor){
        $(floorBg).attr('src',`./assets/img/floors/${floor.Images.Normal}`);
    }

    function changeOption(){
        var option=getCurrentFloor().Options.find(x=>x.Id==this.value);
        if(this.checked){
            var options= getOptions();
            options.push(option);
            setOptions(options);
            OptionDraw(option);
            drawEstimate();
        }else{
            var options= getOptions();
            var index= options.map((item)=>item.Id).indexOf(option.Id);
            options.splice(index,1);
            setOptions(options);
            OptionDelete(option);
            drawEstimate();
        }
    }

    function OptionDraw(option){
        var element = drawOptionItemElement(option);
        $(optionsLayer).append(element);
    }
    function OptionDelete(option){
        var element= $(`#option-item-${option.Id}`)[0];
        $(element).remove();
    }


    function drawEstimate(){
        var totalOptionEstimate=getOptions().reduce((tot,item)=>tot+item.Estimate,0);
        var floor = getCurrentFloor();
        var total= floor.Estimate+totalOptionEstimate;
        $('#Estimate').text(`Estimate: $${total}`);
    }
   

    houses.forEach(house => $("#houses").append(drawHouseElement(house)));

    $('input[type=radio][name=house]').change(function () {
        var house=houses.find(x=>x.Id==this.value);
        setCurrentHouse(house);
        drawSlectedHouseFloors();
    });
    drawSlectedHouseFloors();
    drawSlectedFloorOptions();

    $('input[type=radio][name=house]')[0].checked = true;


});