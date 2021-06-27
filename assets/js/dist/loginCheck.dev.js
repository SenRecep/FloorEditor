"use strict";

(function () {
  if (checkLoginUser() != 'undefined') {
    var loginUser = getLoginUser();
    setInterval(function () {
      document.getElementById("userName").innerHTML = "".concat(loginUser.user.userName, " ").concat(loginUser.company.name);
    }, 1);
    return;
  }

  window.location = "../../admin/pages/login.html";
})();