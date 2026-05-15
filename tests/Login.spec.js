import { test, expect } from '@playwright/test';
import { faker, tr } from '@faker-js/faker';

test('test login functionality', async ({ page }) => {
    const email = 'zaroual@noureddine.com';
    const password = 'zaroual123..';
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Get Started' }).click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await page.getByRole('button', { name: 'Login' }).click();
    const loginForm = page.locator('#loginForm').first();
    await expect(loginForm.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(loginForm.getByPlaceholder('••••••••')).toBeVisible();
    await loginForm.getByPlaceholder('your@email.com').fill(email);
    await loginForm.getByPlaceholder('••••••••').fill(password);
    await loginForm.getByRole('button', { name: 'ACCESS SYSTEM' }).click();
    await expect(page).toHaveTitle('BlueGuardian — Dashboard');
  });

test('test login with incorrect credentials', async ({ page }) => {
    const email = 'incorrect@example.com';
    const password = 'incorrectpassword';
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Get Started' }).click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await page.getByRole('button', { name: 'Login' }).click();
    const loginForm = page.locator('#loginForm').first();
    await expect(loginForm.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(loginForm.getByPlaceholder('••••••••')).toBeVisible();
    await loginForm.getByPlaceholder('your@email.com').fill(email);
    await loginForm.getByPlaceholder('••••••••').fill(password);
    await loginForm.getByRole('button', { name: 'ACCESS SYSTEM' }).click();
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });

test('test login with empty fields', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Get Started' }).click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await page.getByRole('button', { name: 'Login' }).click();
    const loginForm = page.locator('#loginForm').first();
    await expect(loginForm.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(loginForm.getByPlaceholder('••••••••')).toBeVisible();
    await loginForm.getByRole('button', { name: 'ACCESS SYSTEM' }).click();
    await expect(page.getByText('Email and password required')).toBeVisible();
  });

