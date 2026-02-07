import { APIRequestContext } from "playwright";

export class ApiClient {
    constructor(private request: APIRequestContext) {}
    get(url:string,options?:{
        headers?: Record<string,string>
        params?: Record<string,string|number|boolean>
    })
    {
        return this.request.get(url,{
            headers: options?.headers,
            params: options?.params
        })
    }   
}