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
    post(url:string,options?:{
        headers?: Record<string,string>
        data?: Record<string,any>
    })
    {
        return this.request.post(url,{
            headers: options?.headers,
            data: options?.data
        })
    }
    delete(url:string,options?:{
        headers?: Record<string,string>,
        pararms?: Record<string,string|number|boolean>,
        data?: Record<string,any>
    }){
        return this.request.delete(url,{
            headers: options?.headers,
            params: options?.pararms,
            data: options?.data
        })
    }   
    update(url:string,options?:{
        headers?: Record<string,string>,
        data?: Record<string,any>,
        params?: Record<string,string|number|boolean>
})
    {
        return this.request.put(url,{
            headers: options?.headers,
            data: options?.data,
            params: options?.params
        })
    }
}