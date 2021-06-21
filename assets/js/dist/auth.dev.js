"use strict";

var fetchapi = new FetchApi({
  baseUrl: "https://housing-web-app-backend.herokuapp.com/api/v1"
});
var userService = new GenericHttpService("user/login", fetchapi);
var companyService = new GenericHttpService("company", fetchapi);
var signInButton = document.getElementById("signIn");
var signInPageUserName = document.getElementById("signInPageUserName");
var signInPagePassword = document.getElementById("signInPagePassword");
signInButton.addEventListener("click", function _callee(e) {
  var loginResponse, company, localStorageItem;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          _context.next = 3;
          return regeneratorRuntime.awrap(userService.Post({
            userName: signInPageUserName.value,
            password: signInPagePassword.value
          }));

        case 3:
          loginResponse = _context.sent;

          if (!loginResponse.msg) {
            _context.next = 7;
            break;
          }

          alert("Incorrect username or password");
          return _context.abrupt("return");

        case 7:
          console.log(loginResponse);
          _context.next = 10;
          return regeneratorRuntime.awrap(companyService.Get(loginResponse.companyId));

        case 10:
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
          setLoginUser(localStorageItem);
          window.location = "/opushomes/Admin/html/index.html";

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
});