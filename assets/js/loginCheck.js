window.onload=function(){
    if(checkLoginUser()!='undefined'){
        const loginUser= getLoginUser();
        document.getElementById("userName").innerHTML=`${loginUser.user.userName} ${loginUser.company.name}`;
        return;
    }
    window.location="../../Admin/pages/login.html";
}