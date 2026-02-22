import {Container} from "../core/containter";
import {test,expect} from "@playwright/test";
import {faker} from '@faker-js/faker'
import {env} from "../config/env";
import {TestContext} from "../core/testContext";
test.describe.serial("Account Tests",async ()=>{
    let container:Container;
    const testContext=new TestContext();
    test.beforeEach(async ({request})=>{
        container=new Container(request);
    })
    test(`Create account`,async ()=>{
        const username=faker.internet.username();
        const password=env.Password!
        const res= await container.account.registerUser(username,password);
        console.log('Create account',await res.json());
        expect(res.status()).toBe(201);
        expect((await res.json()).username).toBe(username);
        testContext.userId=(await res.json()).userID;
        testContext.username=username;
        expect((await res.json()).books.length).toBe(0);
        //console.log('Create account',await res.json());
    })
    test(`Existed User`,async ()=>{
        const username=env.Username!
        const password=env.Password!
        const res=await container.account.registerUser(username,password);
        console.log('Existed User',await res.json());
        expect(res.status()).toBe(406);
        expect((await res.json()).message).toBe("User exists!");
    })
    test(`Password not follow format`,async ()=>{
        const username=faker.internet.username();
        const password="short"
        const res=await container.account.registerUser(username,password);
        expect(res.status()).toBe(400);
        expect((await res.json()).message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    })
    test('Authorized = false',async()=>{
        const username=testContext.username!;
        const password=env.Password!
        console.log('username',username,password);
        const res=await container.account.getAuthorized(username,password);
        console.log('Authorized = false',await res.json());
        expect(res.status()).toBe(200);
        expect((await res.json())).toBe(false);
    })
    test(`Authorized user not  existed`,async ()=>{
        const username=faker.internet.username();
        const password=env.Password!
        const res=await container.account.getAuthorized(username,password);
        console.log('Authorized user not  existed',await res.json());
        expect(res.status()).toBe(404);
        expect((await res.json()).message).toBe("User not found!");
    })
    test(`Generate token`, async ()=>{
        const username=testContext.username!;
        const password=env.Password!
        const res=await container.account.generateToken(username,password);
        console.log('Generate token',await res.json());
        expect(res.status()).toBe(200);
        expect((await res.json()).token).toBeDefined();
        expect((await res.json()).result).toBe("User authorized successfully.");
        testContext.token=(await res.json()).token;  
    })
    test('Authorized = true',async()=>{
        const username=testContext.username!;
        const password=env.Password!
        const res=await container.account.getAuthorized(username,password);
        expect(res.status()).toBe(200);
        expect((await res.json())).toBe(true);
        console.log('Authorized',await res.json());
    })
    test('Get user Info',async()=>{
        const userId=testContext.userId!;
        const token=testContext.token!;
        console.log('Get user Info - userId',userId,token);
        const res=await container.account.getUser(userId,token)
        console.log('Get user Info',await res.json());
        expect(res.status()).toBe(200);
        expect((await res.json()).username).toBe(testContext.username);
        expect((await res.json()).userId).toBe(userId);
    })
    test('Delete User',async()=>{
        const userId=testContext.userId!;
        const token=testContext.token!;
        const res=await container.account.deleteAccount(userId,token);
        expect(res.status()).toBe(204);
        console.log('Delete User',res.status());
    })
})