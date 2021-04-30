const floorBg = $('.floor img')[0];

const optionsLayer=$('#options-layer');

function drawHouseElement(house) {
    return `<li> <span> <a href="./assets/img/houses/${house.Image}" data-lightbox="roadtrip"><img src="./assets/img/houses/${house.Image}" alt="${house.Name}" /></a> <input id="house-${house.Id}" type="radio" value="${house.Id}" name="house"> <label for="house-${house.Id}">${house.Name}</label> </span> </li>`;
}
function drawFloorElement(floor) {
    return `<li> <span> <input id="floor-${floor.Id}" type="radio" value="${floor.Id}" name="floor" > <label for="floor-${floor.Id}">${floor.Name}</label> </span> </li>`;
}
function drawOptionElement(option) {
    return `<li> <span> <input id="option-${option.Id}"  type="checkbox" value="${option.Id}" name="option" > <label for="option-${option.Id}">${option.Name}</label> </span> </li>`;
}

function drawOptionItemElement(option) {
    return `<div id="option-item-${option.Id}" class="option-item" > <img  alt="${option.Name}"> </div>`;
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
        $("#options li").hover(function() {
            let input=$(this).children().children('input')[0];
            $(input).prop("checked", !$(input).prop("checked"));
            $(input).trigger("change");
          });
        // $(`#options li`).on('mouseover',function(){
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
    drawDirectionOption(option,getFlip());
}

function drawDirectionOption(option,isFlip){
    var element= $(`#option-item-${option.Id}`)[0];
    var img=$(element).children()[0];
    var prop=isFlip?"Invers":"Normal";
    img.setAttribute('src',`/assets/img/Options/${option[prop].Image}`);
    element.style.top=option[prop].Location.Top;
    element.style.left=option[prop].Location.Left;
    element.style.right=option[prop].Location.Right;
    element.style.bottom=option[prop].Location.Bottom;
    element.style.height=option.Size.Height;
    element.style.width=option.Size.Width;
}

function OptionDelete(option){
    var element= $(`#option-item-${option.Id}`);
    $(element).remove();
}

function AllOptionDelete(){
    $("input[name='option']:checked").each(function ()
    {
      $(this).prop('checked', false); // Unchecks it)); 
    });
    let options=getOptions();
    options.forEach(item=>{
      OptionDelete(item);
    });
    
}



function drawEstimate(){
    var totalOptionEstimate=getOptions().reduce((tot,item)=>tot+item.Estimate,0);
    var floor = getCurrentFloor();
    var total= floor.Estimate+totalOptionEstimate;
    //$('#Estimate').text(`Estimate: $${total}`);
}





$(document).ready(async function () {
    const houses = await fetch("db.json").then(x => x.json());
    
     setCurrentHouse(houses[0]);
     setCurrentFloor(getCurrentHouse().Floors[0]);
     setOptions([]);
     setFlip(false);

    
     houses.forEach(house => $("#houses").append(drawHouseElement(house)));

     $('input[type=radio][name=house]').change(function () {
         var house=houses.find(x=>x.Id==this.value);
         setCurrentHouse(house);
         drawSlectedHouseFloors();
     });
     drawSlectedHouseFloors();
     
     $('input[type=radio][name=house]')[0].checked = true;
});

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })
  function printDiv() 
  {
  
    var divToPrint=document.getElementById('wrapper');
  
    var newWin=window.open('','Print-Window');
  
    newWin.document.open();
  
    newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
  
    newWin.document.close();
  
    setTimeout(function(){newWin.close();},10);
  
  }