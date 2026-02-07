import { test, expect,request } from '@playwright/test';
import {env} from '../config/env';
test('has title', async ({ request }) => {
  console.log('asd',env.BASEURL);
  const res=await request.get(`${env.BASEURL}/BookStore/v1/Books`);
  console.log(await res.json());
  // Expect a title "to contain" a substring.
  
});

