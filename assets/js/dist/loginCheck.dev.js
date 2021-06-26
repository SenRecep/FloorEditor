"use strict";

window.onload = function () {
  var loginUser = getLoginUser();

  if (loginUser) {
    document.getElementById("userName").innerHTML = "".concat(loginUser.user.userName, " ").concat(loginUser.company.name);
    return;
  }

  window.location = "../../Admin/html/login.html";
};