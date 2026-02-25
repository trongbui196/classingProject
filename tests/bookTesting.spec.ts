import {test,expect} from '@playwright/test'
import {validateSchema} from '../helpers/schemaValidate'
import {Container} from "../core/containter";
import * as schema from '../data/schemas/book.schema';
import { env } from '../config/env';
test.describe.serial('Book Tests',async()=>{
    let container:Container;
    let bookisbn:string='9781449325862'
    let token:string
    let listofbooks:string[]=[]
    const username=env.Username!
    const password=env.Password!
    const userId=env.UserId!
    test.beforeEach(async({request})=>{
        container=new Container(request)
    })
    test.beforeAll(async({request})=>{
    
        container=new Container(request);
        const res=await container.account.generateToken(username,password);
        const body=await res.json();
        expect(body.status).toBe("Success");
        token=body.token;
        console.log(`login with ${username} and ${password}: `,token)
        const res2=await container.account.getAuthorized(username,password)
        const body2=await res2.json();
        expect (body2).toBe(true)
    })
    test(`Get all books`,async()=>{
       const res=await container.book.getAllBooks();
       const body=await res.json();
        const result=validateSchema(schema.getAllBookSchema,body)
        expect(result.valid).toBe(true)
        for(const i of body.books)
        {
            listofbooks.push(i.isbn)
        }
    })
    test('Get a book',async()=>{
        const res=await container.book.getABook(bookisbn,token);
        const body=await res.json();
       const result=validateSchema(schema.getABookSchema,body)
        expect(result.valid).toBe(true)
        expect(body).toStrictEqual({
  "isbn": "9781449325862",
  "title": "Git Pocket Guide",
  "subTitle": "A Working Introduction",
  "author": "Richard E. Silverman",
  "publish_date": "2020-06-04T08:48:39.000Z",
  "publisher": "O'Reilly Media",
  "pages": 234,
  "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
  "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
})
    })
    test('Add books to user',async()=>{
        let listofisbn:Record<string,string>[]=[]
        for (const i of listofbooks)
        {
            listofisbn.push({isbn:i})
        }
       // console.log('list of isbn',listofisbn)
        const res=await container.book.addBooktoUser(userId,listofisbn,token);
        const body=await res.json();
       // console.log('123',body)
        expect(body.books.length).toBe(listofbooks.length)
        body.books.forEach((book:any)=>{
            expect(listofbooks).toContain(book.isbn)
        })
        bookisbn=body.books[0].isbn
    })
    test('Delete a book',async()=>{
        const res=await container.book.deleteABook(userId,bookisbn,token);
        // const body=await res.json();
        // console.log('delete a book',body)
        // expect(body.books.length).toBe(listofbooks.length-1)
        expect(res.status()).toBe(204)
        const res1=await container.account.getUser(userId,token);
        const body1=await res1.json();
        body1.books.forEach((book:any)=>{
            expect(book.isbn).not.toBe(bookisbn)
        })
    })
    test('Delete all books',async()=>{
        const res=await container.book.deleteAllBooks(userId,token);
        expect(res.status()).toBe(204)
        const res1=await container.account.getUser(userId,token);
        const body1=await res1.json();
        expect(body1.books.length).toBe(0)
    })
})