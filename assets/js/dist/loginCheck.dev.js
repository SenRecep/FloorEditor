"use strict";

(function () {
  if (checkLoginUser() != 'undefined' && checkLoginUser() != null) {
    var loginUser = getLoginUser();
    console.log(loginUser);
    setTimeout(function () {
      document.getElementById("userName").innerHTML = "".concat(loginUser.user.userName, " ").concat(loginUser.company.name);
    }, 10);
    return;
  }

  window.location = "../../admin/pages/login.html";
})();