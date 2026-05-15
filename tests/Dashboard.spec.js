import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import { RegisterPage } from '../pages/Signup';

test('test dashboard access after login', async ({page}) => {
    const email = 'zaroual@noureddine.com';
    const password = 'zaroual123..';
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', {name: 'Get Started'}).click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await page.getByRole('button', {name: 'Login'}).click();
    const loginForm = page.locator('#loginForm').first();
    await expect(loginForm.getByPlaceholder('your@email.com')).toBeVisible();    
    await expect(loginForm.getByPlaceholder('••••••••')).toBeVisible();
    await loginForm.getByPlaceholder('your@email.com').fill(email);
    await loginForm.getByPlaceholder('••••••••').fill(password);
    await loginForm.getByRole('button', {name: 'ACCESS SYSTEM'}).click();
    await expect(page).toHaveTitle('BlueGuardian — Dashboard');
  });

test('test scanning with valid file', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.setInputFiles('#fileInput', './fixtures/images/valid.jpg');
    await page.getByRole('button', { name: '⬡  INITIATE SCAN' }).click();
    await expect(page.getByText('⚠ IMAGE LEAK DETECTED')).toBeVisible();
    await expect(page.getByText('Found on SnapShare · Confidence: 99%')).toBeVisible();
    await expect(page.getByText('POSTED BY:')).toBeVisible();
    await expect(page.getByText('DATE:')).toBeVisible();
    await expect(page.getByText('PLATFORM:')).toBeVisible();
    await expect(page.getByText('CAPTION:')).toBeVisible();
    const leakLocation = page.getByText('http://localhost:3001/post/8cb26aa1-9c49-4f3e-bc50-1b2eebdf76d5');
    const leakPersonName = page.getByRole('strong').filter({ hasText: '@younes' });
    const leakDate = page.getByRole('strong').filter({ hasText: '4/28/2026, 2:42:52 AM' });
    const leakPlatform = page.getByRole('strong').filter({ hasText: 'SnapShare' });
    const leakCaption = page.getByText('slm');
    const leakHatchId = page.getByText('MATCH ID: 8cb26aa1-9c49-4f3e-bc50-1b2eebdf76d5');
    const leakstatus = page.getByText(/STATUS: LEAKED/);
    await expect(leakLocation).toBeVisible();
    await expect(leakPersonName).toBeVisible();
    await expect(leakDate).toBeVisible();
    await expect(leakPlatform).toBeVisible();
    await expect(leakCaption).toBeVisible();
    await expect(leakHatchId).toBeVisible();
    await expect(leakstatus).toBeVisible();
    });
test('test buttons in valid scan', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.setInputFiles('#fileInput', './fixtures/images/valid.jpg');
    await page.getByRole('button', { name: '⬡  INITIATE SCAN' }).click();
    await expect(page.getByText('⚠ IMAGE LEAK DETECTED')).toBeVisible();
    await page.getByRole('button', { name: '⚑  REPORT LEAK' }).click();
    await expect(page.getByText('REPORT FILED')).toBeVisible();
    await expect(page.getByRole('button', { name: '✓ REPORTED' })).toBeVisible();
    await page.getByRole('button', { name: '✕  REQUEST REMOVAL' }).click();
    await expect(page.getByText('REMOVAL REQUESTED')).toBeVisible();
    await expect(page.getByRole('button', { name: '✓ REQUESTED' })).toBeVisible();
    await page.getByRole('button', { name: '↺  NEW SCAN' }).click();
    await expect(page.getByText('⚠ IMAGE LEAK DETECTED')).not.toBeVisible();

    });
test('test scaning with invalid file', async ({page}) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.setInputFiles('#fileInput', './fixtures/images/invalid.png');
    await page.getByRole('button', { name: '⬡  INITIATE SCAN' }).click();
    await expect(page.getByText('NO LEAK DETECTED')).toBeVisible();
    await expect(page.getByRole('button', { name: '↺  NEW SCAN' })).toBeVisible();
    await page.getByRole('button', { name: '↺  NEW SCAN' }).click();
    await expect(page.getByText('NO LEAK DETECTED')).not.toBeVisible();
    });
test('test logout button ', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
   });
test('test back to home button in dashboard', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.getByRole('link', { name: '← Landing' }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page).toHaveTitle('BlueGuardian — Protect Your Digital Identity');
    });
    
test('displays image preview and metadata', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.setInputFiles('#fileInput', './fixtures/images/valid.jpg');
    await expect(page.locator('#prevImg')).toBeVisible();
    await expect(page.getByText(/NAME: valid.jpg/)).toBeVisible();
    await expect(page.getByText(/SIZE: [\d.]+ KB/)).toBeVisible();
    await expect(page.getByText(/TYPE: image\/jpeg/)).toBeVisible();
});

test('new scan button clears results', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.setInputFiles('#fileInput', './fixtures/images/valid.jpg');
    await page.getByRole('button', { name: 'INITIATE SCAN' }).click();
    await expect(page.getByText('⚠ IMAGE LEAK DETECTED')).toBeVisible();
    await page.getByRole('button', { name: 'NEW SCAN' }).click();
    await expect(page.getByText('⚠ IMAGE LEAK DETECTED')).not.toBeVisible();
    await expect(page.locator('#prevArea')).not.toBeVisible();
    await expect(page.locator('#faceArea')).not.toBeVisible();
});

test('scan button disabled without file', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await expect(page.getByRole('button', { name: 'INITIATE SCAN' })).toBeDisabled();
});

test('scan button enabled after file selection', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.setInputFiles('#fileInput', './fixtures/images/valid.jpg');
    await expect(page.getByRole('button', { name: 'INITIATE SCAN' })).toBeEnabled();
});

test('history table shows correct scan data', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    await registerPage.goto();
    await registerPage.register({ name, email, password });
    await page.setInputFiles('#fileInput', './fixtures/images/valid.jpg');
    await page.getByRole('button', { name: 'INITIATE SCAN' }).click();
    await expect(page.getByText('⚠ IMAGE LEAK DETECTED')).toBeVisible();
    const historyTable = page.locator('.hist-table');
    await expect(historyTable).toBeVisible();
    await expect(historyTable.locator('td').filter({ hasText: 'LEAKED' })).toBeVisible();
    await expect(historyTable.locator('td').filter({ hasText: '100%' })).toBeVisible();
});


