const fetchapi = new fetchApi({
    baseUrl: "http://localhost:3000"
});
const companyService = new GenericHttpService("company", fetchapi);
const houseService= new GenericHttpService("house",fetchapi);

window.onload = async () => {
    let companies = await companyService.GetAll();
    console.log(companies);
    // let newCompany = await companyService.Post({ name: "Abc", logo: "abc.png" });
    // console.log(newCompany);

    // var updateCompany= companies[0];
    // let updateResult= await companyService.Patch(updateCompany.id,{name:"Test"});
    // console.log(updateResult);

    //  var updateCompany= companies[0];
    // updateCompany.name="Cba";
    // let updateResult= await companyService.Put(updateCompany.id,updateCompany);
    // console.log(updateResult);

    //  var deleteResult= await companyService.Delete(companies[2].id);
    //  console.log(deleteResult);
    
    // var houses=await companyService.GetAllSub(companies[0].id,"houses");
    // console.log(houses);
    // var house= await houseService.Get(houses[0].id);
    // console.log(house);
    // var floors= await houseService.GetAllSub(houses[0].id,"floors");
    // console.log(floors);
};

