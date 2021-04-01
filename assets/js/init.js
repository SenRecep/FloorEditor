$(document).ready(async function () {

    const floorBg = $('.floor img')[0];

    const houses = await fetch("db.json").then(x => x.json());
    
     setCurrentHouse(houses[0]);
     setCurrentFloor(getCurrentHouse().Floors[0]);
     setCurrentOption(null);

    function drawHouseElement(house) {
        return `<li> <a href="#"> <img src="./assets/img/houses/${house.Image}" alt="${house.Name}"/> <input id="house-${house.Id}" type="radio" value="${house.Id}" name="house"> <label for="house-${house.Id}">${house.Name}</label> </a> </li>`;
    }
    function drawFloorElement(floor) {
        return `<li> <a href="#"> <input id="floor-${floor.Id}" type="radio" value="${floor.Id}" name="floor" > <label for="floor-${floor.Id}">${floor.Name}</label> </a> </li>`;
    }
    function drawOptionElement(option) {
        return `<li> <a href="#"> <input id="option-${option.Id}" type="checkbox" value="${option.Id}" name="option" > <label for="option-${option.Id}">${option.Name}</label> </a> </li>`;
    }

    function drawSlectedHouseFloors(){
        $("#floors").empty();
        getCurrentHouse().Floors.forEach(floor => $("#floors").append(drawFloorElement(floor)));
        $('input[type=radio][name=floor]')[0].checked = true;
        $('input[type=radio][name=floor]').change(changeFloor);
        setCurrentFloor(getCurrentHouse().Floors[0]);
        floorDraw(getCurrentFloor())
        setCurrentOption(null);
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
        setCurrentOption(null);
        drawSlectedFloorOptions();
        floorDraw(floor);
        drawEstimate();
    }

    function floorDraw(floor){
        $(floorBg).attr('src',`./assets/img/floors/${floor.Images.Normal}`);
    }

    function changeOption(){
        //Demo
        document.querySelectorAll('input[name="option"]').forEach(input=>{
            if(this !==input)
              input.checked=false;
        });
        //Demo
        if(this.checked){
            var option=getCurrentFloor().Options.find(x=>x.Id==this.value);
            setCurrentOption(option);
            OptionDraw(option);
            drawEstimate();
        }else{
            setCurrentOption(null);
            var floor= getCurrentFloor();
            floorDraw(floor);
            drawEstimate();
        }
        
    }

    function OptionDraw(option){
        $(floorBg).attr('src',`./assets/img/floors/${option.Images.Normal}`);
    }

    function drawEstimate(){
        var option = getCurrentOption();
        var floor = getCurrentFloor();
       if(option){
            $('#Estimate').text(`Estimate: $${option.Estimate}`);
       } else if(floor){
        $('#Estimate').text(`Estimate: $${floor.Estimate}`);
       }
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