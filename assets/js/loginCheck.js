(() => {
    if (checkLoginUser() != 'undefined' && checkLoginUser()!=null) {
        const loginUser = getLoginUser();
        console.log(loginUser);
        setTimeout(()=>{
            document.getElementById("userName").innerHTML = `${loginUser.user.userName} ${loginUser.company.name}`;
        },10);
        return;
    }
    window.location = "../../admin/pages/login.html";
})();


