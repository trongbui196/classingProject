import {test,expect} from '@playwright/test'
import {readCSV} from '../helpers/csvParse'
import {Container} from "../core/containter";

test.describe('data driven test',async()=>{
    let auth:any;
    let reg:any
    test.beforeAll(async()=>{
         auth= await readCSV(`data/user_auth.csv`)
         console.log('readding')
         for(const i of auth)
         {
            console.log('asd', i)
         }
         reg=await readCSV(`data/user_reg.csv`)
    })
    test(`register`,async({request})=>{
        for(const i of reg)
        {
            const container=new Container(request)
            // console.log('credential: ',i.username,i.password)
            const res=await container.account.registerUser(i.username,i.password)
            // console.log(await res.json())
            expect(res.status()).toEqual(Number(i.code))
        }
    })
    test('auth',async({request})=>{
        for(const i of auth)
        {
            const container=new Container(request)
            const res=await container.account.getAuthorized(i.username,i.password)
            console.log('credential: ',i.username,i.password)
            console.log(await res.json())
            expect(res.status()).toEqual(Number(i.code))
        }
    })
})
