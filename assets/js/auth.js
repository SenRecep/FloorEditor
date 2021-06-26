const fetchapi = new FetchApi({
    baseUrl: "https://housing-web-app-backend.herokuapp.com/api/v1"
});
const userService= new GenericHttpService("user/login",fetchapi);
const companyService= new GenericHttpService("company",fetchapi);

const signInButton=document.getElementById("signIn");
const signInPageUserName=document.getElementById("signInPageUserName");
const signInPagePassword=document.getElementById("signInPagePassword");
signInButton.addEventListener("click",async (e)=>{
    e.preventDefault();
    let loginResponse= await userService.Post({
        userName:signInPageUserName.value,
        password:signInPagePassword.value
    });
    if(loginResponse.msg){
        alert("Incorrect username or password");
        return;
    }
    console.log(loginResponse);
 
    let company =await companyService.Get(loginResponse.companyId);
    console.log(company);
 
    let localStorageItem= {
        user:{
            id:loginResponse.id,
            userName:loginResponse.userName,
            companyId:loginResponse.companyId
        },
        company:{
         id:company.id,
         name:company.name,
         logo:company.logo
        }
     }
    setLoginUser(localStorageItem);
    window.location="../../Admin/html/index.html";
});