import { ApiClient } from "../core/apiClient";

export class BookActions {
    constructor(private apiClient:ApiClient){}
    getAllBooks(){
        return this.apiClient.get('/BookStore/v1/Books')
    }
    getABook(isbn:string){
        return this.apiClient.get(`/BookStore/v1/Book?ISBN=${isbn}`)
    }
    addBooktoUser(userId:string,isbn:Record<string,string>[])
    {
        return this.apiClient.post('/BookStore/v1/Books',{
            data:{
                userId,
                collectionOfIsbns:isbn
            }
        })
    }
    deleteABook(userId:string,isbn:string)
    {
        return this.apiClient.delete('/BookStore/v1/Book',{
            data:{
                userId,
                isbn
            }
        })
    }
    deleteAllBooks(userId:string)
    {
        return this.apiClient.delete(`/BookStore/v1/Books/${userId}`)
    }
    updateBooks(PathISBN:string,userId:string,isbn:string)
    {
        return this.apiClient.update(`/BookStore/v1/Books/${PathISBN}`,{
            data:{
                userId,
                isbn
            }
        })
    }
}