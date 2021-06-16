"use strict";

var fetchapi = new FetchApi({
  baseUrl: "https://housing-web-app-backend.herokuapp.com/api/v1"
});
var userService = new GenericHttpService("user/login", fetchapi);
var companyService = new GenericHttpService("company", fetchapi);

window.onload = function _callee() {
  var loginResponse, company, localStorageItem;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(userService.Post({
            userName: "opus.visuals.1",
            password: "Password122"
          }));

        case 2:
          loginResponse = _context.sent;
          console.log(loginResponse);
          _context.next = 6;
          return regeneratorRuntime.awrap(companyService.Get(loginResponse.companyId));

        case 6:
          company = _context.sent;
          console.log(company);
          localStorageItem = {
            user: {
              id: loginResponse.id,
              userName: loginResponse.userName,
              companyId: loginResponse.companyId
            },
            company: {
              id: company.id,
              name: company.name,
              logo: company.logo
            }
          };
          window.localStorage.setItem("LoginUser", JSON.stringify(localStorageItem));
          console.log(JSON.parse(window.localStorage.getItem("LoginUser")));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};