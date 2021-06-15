"use strict";

var fetchapi = new fetchApi({
  baseUrl: "http://localhost:3000"
});
var companyService = new GenericHttpService("company", fetchapi);
var houseService = new GenericHttpService("house", fetchapi);

window.onload = function _callee() {
  var companies;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(companyService.GetAll());

        case 2:
          companies = _context.sent;
          console.log(companies); // let newCompany = await companyService.Post({ name: "Abc", logo: "abc.png" });
          // console.log(newCompany);
          // var updateCompany= companies[0];
          // let updateResult= await companyService.Patch(updateCompany.id,{name:"Test"});
          // console.log(updateResult);
          //  var updateCompany= companies[0];
          // updateCompany.name="Cba";
          // let updateResult= await companyService.Put(updateCompany.id,updateCompany);
          // console.log(updateResult);
          //  var deleteResult= await companyService.Delete(companies[2].id);
          //  console.log(deleteResult);
          // var houses=await companyService.GetAllSub(companies[0].id,"houses");
          // console.log(houses);
          // var house= await houseService.Get(houses[0].id);
          // console.log(house);
          // var floors= await houseService.GetAllSub(houses[0].id,"floors");
          // console.log(floors);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};