const fetchapi = new FetchApi({
    baseUrl: "https://housing-web-app-backend.herokuapp.com/api/v1"
});
const userService= new GenericHttpService("user/login",fetchapi);
const companyService= new GenericHttpService("company",fetchapi);

window.onload = async () => {
   let loginResponse= await userService.Post({
       userName:"opus.visuals.1",
       password:"Password122"
   });
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
   window.localStorage.setItem("LoginUser",JSON.stringify(localStorageItem));
   console.log(JSON.parse(window.localStorage.getItem("LoginUser")));
};

