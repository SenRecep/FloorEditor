const separators={
    HTML:"<br/>",
    STRING:"\n"
}
const endpoints={
    LOGIN:"user/login",
    COMPANY:"company",
    HOUSE:"house",
    HOUSES:"houses",
    FLOOR:"floor",
    FLOORS:"floors",
    OPTION:"option",
    OPTIONS:"options",
    USER:"user",
    USERS:"users",
}
class ApiError{
    constructor(errors=[],isShow=false,path=""){
        this.errors=errors;
        this.isShow=isShow;
        this.path=path;
    }
    static getErrors(error,separator=separators.STRING){
        return error.errors.join(separator);
    }
}
class ApiResponse{
    constructor(data=null,statusCode=200,isSuccessful=true,method="",error=new ApiError()){
        this.data=data;
        this.statusCode=statusCode;
        this.isSuccessful=isSuccessful;
        this.method=method;
        this.error=error;
    }
    static success(data=null,code=200,method){
        return new ApiResponse(data,code,true,method,null);
    }
    static fail(code,method,isShow,path,errors){
        return new ApiResponse(null,code,false,method,new ApiError(errors,isShow,path));
    }
}
class FetchApi {
    constructor(config) {
        this.config = config;
    }
    async fetchPipeLineAsync(req){
        return await fetch(req)
        .then(async response => {
            if (response.ok) {
                const text= await response.text();
                const isHTML= text.includes("html");
                if(isHTML) return ApiResponse.fail(400,req.method,false,req.url,["Bad Request"]);
                const json= JSON.parse(text);
                if(json.msg) return ApiResponse.fail(400,req.method,false,req.url,[json.msg]);
                return ApiResponse.success(json,response.status,req.method)
            } 
            throw new Error('Something went wrong on api server!');
        }).catch(error => {
            return  ApiResponse.fail(500,req.method,false,req.url,[error]);
        });
    }
    async requestByUrlAsync(url) {
        url = `${this.config.baseUrl}/${url}`;
        return await this.fetchPipeLineAsync(new Request(url));
    }

    async requestByConfigAsync(url, request) {
        url = `${this.config.baseUrl}/${url}`;
        return await this.fetchPipeLineAsync(new Request(url, request));
    }

    async requestByBodyAsync(url, method, body) {
        url = `${this.config.baseUrl}/${url}`;
        return await this.fetchPipeLineAsync(new Request(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        }));
    }
}
class GenericHttpService {
    constructor(table, fetchApi) {
        this.table = table;
        this.fetchApi = fetchApi;
    }
    async GetAllAsync() {
        return await this.fetchApi.requestByUrlAsync(this.table);
    }
    async GetAllSubAsync(id, subTable) {
        return await this.fetchApi.requestByUrlAsync(`${this.table}/${id}/${subTable}`);
    }
    async GetAsync(id) {
        return await this.fetchApi.requestByUrlAsync(`${this.table}/${id}`);
    }
    async DeleteAsync(id) {
        return await this.fetchApi.requestByConfigAsync(`${this.table}/${id}`, { method: "DELETE" });
    }
    async PutAsync(id,data) {
        return this.fetchApi.requestByBodyAsync(`${this.table}/${id}`, "PUT", data);
    }
    async PatchAsync(id,data) {
        return this.fetchApi.requestByBodyAsync(`${this.table}/${id}`, "PATCH", data);
    }
    async PostAsync(data) {
        return this.fetchApi.requestByBodyAsync(this.table, "POST", data);
    }
}

