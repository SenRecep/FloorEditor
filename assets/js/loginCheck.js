(() => {
    if (checkLoginUser() != 'undefined') {
        const loginUser = getLoginUser();
        setInterval(()=>{
            document.getElementById("userName").innerHTML = `${loginUser.user.userName} ${loginUser.company.name}`;
        },1);
        return;
    }
    window.location = "../../admin/pages/login.html";
})();


