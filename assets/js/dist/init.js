$(document).ready(async function(){

    const wrapperElement = document.getElementById("wrapper");
    const editorElement = document.getElementById("editor");
    const houses =await fetch("db.json").then(x=>x.json());

    var currentHouse=houses[0];

    console.log(currentHouse);

    function drawHouseElement(house){
        return `<li> <a href="#"> <img src="./assets/img/houses/${house.Image}" alt="${house.Name}"/> <input id="house-${house.Id}" type="radio" value="${house.Id}" name="house"> <label for="house-${house.Id}">${house.Name}</label> </a> </li>`;
    }

    houses.forEach(house => $("#houses").append(drawHouseElement(house)));
    $('input[type=radio][name=house]')[0].checked=true;

    $('input[type=radio][name=house]').change(function() {
        alert(this.value);
    });
});