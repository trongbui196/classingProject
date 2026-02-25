import { ApiClient } from "../core/apiClient";

export class BookActions {
    constructor(private apiClient:ApiClient){}
    getAllBooks(){
        return this.apiClient.get('/BookStore/v1/Books')
    }
    getABook(isbn:string,token:string){
        return this.apiClient.get(`/BookStore/v1/Book?ISBN=${isbn}`,{
            headers:{
                Authorization:`Bearer ${token}`}
        })
    }
    addBooktoUser(userId:string,isbn:Record<string,string>[],token:string)
    {
        return this.apiClient.post('/BookStore/v1/Books',{
             headers:{
                Authorization:`Bearer ${token}`},
            data:{
                userId,
                collectionOfIsbns:isbn
            }
        })
    }
    deleteABook(userId:string,isbn:string,token:string)
    {
        return this.apiClient.delete('/BookStore/v1/Book',{
            headers:{
                Authorization:`Bearer ${token}`},
            
            data:{
                userId,
                isbn
            }
        })
    }
    deleteAllBooks(userId:string,token:string
    )
    {
        return this.apiClient.delete(`/BookStore/v1/Books?UserId=${userId}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`},
            }
        )
    }
    updateBooks(PathISBN:string,userId:string,isbn:string,token:string)
    {
        return this.apiClient.update(`/BookStore/v1/Books/${PathISBN}`,{
            headers:{
                Authorization:`Bearer ${token}`},
            data:{
                userId,
                isbn
            }
        })
    }
}