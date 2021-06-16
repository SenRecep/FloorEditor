class FetchApi {
    constructor(config) {
        this.config = config;
    }
    async requestByUrl(url) {
        url = `${this.config.baseUrl}/${url}`;
        var result = await fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Something went wrong on api server!');
            }).catch(error => {
                console.error(error);
            });
        return result;
    }

    async requestByConfig(url, request) {
        url = `${this.config.baseUrl}/${url}`;
        var req = new Request(url, request);
        var result = await fetch(req)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Something went wrong on api server!');
            }).catch(error => {
                console.error(error);
            });
        return result;
    }

    async requestByBody(url, method, body) {
        url = `${this.config.baseUrl}/${url}`;
        let request = new Request(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        });
        var result = await fetch(request)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Something went wrong on api server!');
            }).catch(err => {
                console.error(err);
            });
        return result;
    }
}
class GenericHttpService {
    constructor(table, fetchApi) {
        this.table = table;
        this.fetchApi = fetchApi;
    }
    async GetAll() {
        return await this.fetchApi.requestByUrl(this.table);
    }
    async GetAllSub(id, subTable) {
        return await this.fetchApi.requestByUrl(`${this.table}/${id}/${subTable}`);
    }
    async Get(id) {
        return await this.fetchApi.requestByUrl(`${this.table}/${id}`);
    }
    async Delete(id) {
        return await this.fetchApi.requestByConfig(`${this.table}/${id}`, { method: "DELETE" });
    }
    async Put(id,data) {
        return this.fetchApi.requestByBody(`${this.table}/${id}`, "PUT", data);
    }
    async Patch(id,data) {
        return this.fetchApi.requestByBody(`${this.table}/${id}`, "PATCH", data);
    }
    async Post(data) {
        return this.fetchApi.requestByBody(this.table, "POST", data);
    }
}
