"use strict";

window.onload = function () {
  if (checkLoginUser() != 'undefined') {
    var loginUser = getLoginUser();
    document.getElementById("userName").innerHTML = "".concat(loginUser.user.userName, " ").concat(loginUser.company.name);
    return;
  }

  window.location = "../../Admin/pages/login.html";
};