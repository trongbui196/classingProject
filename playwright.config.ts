import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { env } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: env.BASEURL,
    trace: 'on-first-retry',
  },

  
});
