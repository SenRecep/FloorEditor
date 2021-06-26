const fetchapi = new FetchApi({
    baseUrl: "https://housing-web-app-backend.herokuapp.com/api/v1"
});
const userService= new GenericHttpService(endpoints.LOGIN,fetchapi);
const companyService= new GenericHttpService(endpoints.COMPANY,fetchapi);

const signInButton=document.getElementById("signIn");
const signInPageUserName=document.getElementById("signInPageUserName");
const signInPagePassword=document.getElementById("signInPagePassword");
signInButton.addEventListener("click",async (e)=>{
    e.preventDefault();
    let loginResponse= await userService.PostAsync({
        userName:signInPageUserName.value,
        password:signInPagePassword.value
    });
    if(!loginResponse.isSuccessful){
        alert(ApiError.getErrors(loginResponse.error));
        return;
    }
    const loginData=loginResponse.data;
    console.log(loginData);
 
    let companyResponse =await companyService.GetAsync(loginData.companyId);
    if(!companyResponse.isSuccessful){
        alert(ApiError.getErrors(loginResponse.error));
        return;
    }
    const company=companyResponse.data;
    console.log(company);
 
    let localStorageItem= {
        user:{
            id:loginData.id,
            userName:loginData.userName,
            companyId:loginData.companyId
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