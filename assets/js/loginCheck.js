window.onload=function(){
    const loginUser= getLoginUser();
    if(loginUser){
        document.getElementById("userName").innerHTML=`${loginUser.user.userName} ${loginUser.company.name}`;
        return;
    }
    window.location="../../Admin/html/login.html";
}