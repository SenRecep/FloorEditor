"use strict";

var fetchapi = new FetchApi({
  baseUrl: "https://housing-web-app-backend.herokuapp.com/api/v1"
});
var userService = new GenericHttpService(endpoints.LOGIN, fetchapi);
var companyService = new GenericHttpService(endpoints.COMPANY, fetchapi);
var signInButton = document.getElementById("signIn");
var signInPageUserName = document.getElementById("signInPageUserName");
var signInPagePassword = document.getElementById("signInPagePassword");
signInButton.addEventListener("click", function _callee(e) {
  var loginResponse, loginData, companyResponse, company, localStorageItem;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          _context.next = 3;
          return regeneratorRuntime.awrap(userService.PostAsync({
            userName: signInPageUserName.value,
            password: signInPagePassword.value
          }));

        case 3:
          loginResponse = _context.sent;

          if (loginResponse.isSuccessful) {
            _context.next = 7;
            break;
          }

          alert(ApiError.getErrors(loginResponse.error));
          return _context.abrupt("return");

        case 7:
          loginData = loginResponse.data;
          console.log(loginData);
          _context.next = 11;
          return regeneratorRuntime.awrap(companyService.GetAsync(loginData.companyId));

        case 11:
          companyResponse = _context.sent;

          if (companyResponse.isSuccessful) {
            _context.next = 15;
            break;
          }

          alert(ApiError.getErrors(loginResponse.error));
          return _context.abrupt("return");

        case 15:
          company = companyResponse.data;
          console.log(company);
          localStorageItem = {
            user: {
              id: loginData.id,
              userName: loginData.userName,
              companyId: loginData.companyId
            },
            company: {
              id: company.id,
              name: company.name,
              logo: company.logo
            }
          };
          setLoginUser(localStorageItem);
          window.location = "../../Admin/html/index.html";

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
});