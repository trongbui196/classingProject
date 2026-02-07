import { ApiClient } from "../core/apiClient";

export class AccountActions {
    constructor(private apiClient:ApiClient){}

    getAuthorized(username:string,password:string){
        return this.apiClient.post('/Account/v1/Authorized',{
            data:{
                userName:username,
                password:password
            }
        })
    }
    registerUser(username:string,password:string){
        return this.apiClient.post('/Account/v1/User',{
            data:{
                userName:username,
                password:password
            }
        })
    }
    generateToken(username:string,password:string){
        return this.apiClient.post('/Account/v1/GenerateToken',{
            data:{
                userName:username,
                password:password
            }
        })
    }
    deleteAccount(userUUID:string,token:string)
    {
        return this.apiClient.delete(`/Account/v1/User/${userUUID}`,{
            headers:{
                Authorization:`Bearer ${token}`}
        })
    }
    getUser(userUUID:string,token:string){
        return this.apiClient.get(`/Account/v1/User/${userUUID}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
    }
}