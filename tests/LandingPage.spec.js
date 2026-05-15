import { test, expect } from '@playwright/test';

test.describe('test landing page BlueGuardian', () => {
  test('should have the correct title', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle('BlueGuardian — Protect Your Digital Identity');
  });
  
  test('test "Get Started" button', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('Get Started').click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
  });
  
  test('test "Login" button', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('Login').click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
    const loginForm = page.locator('#loginForm').first();
    await expect(loginForm.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(loginForm.getByPlaceholder('••••••••')).toBeVisible();
  });
  
  test('test "START SCANNING FREE" button', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('START SCANNING FREE').click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
    const scanningForm = page.locator('#loginForm').first();
    await expect(scanningForm.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(scanningForm.getByPlaceholder('••••••••')).toBeVisible();
  });

  test('test "CREATE FREE ACCOUNT" button', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('CREATE FREE ACCOUNT').click();
    await expect(page).toHaveURL('http://localhost:3000/app');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
    const signupForm = page.locator('#loginForm').first();
    await expect(signupForm.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(signupForm.getByPlaceholder('••••••••')).toBeVisible();
  });

});

test.describe('test anchor links', () => {
  test('test "Features" anchor link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Features' , exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/#features');
    await expect(page.getByRole('heading', { name: 'Everything You Need to Stay Protected' })).toBeVisible();
    await expect(page.getByText('PERCEPTUAL HASHING', { exact: true })).toBeVisible();
    await expect(page.getByText('AI FACE DETECTION', { exact: true })).toBeVisible();
    await expect(page.getByText('SECURE ACCOUNTS', { exact: true })).toBeVisible();
    await expect(page.getByText('SCAN HISTORY', { exact: true })).toBeVisible();
    await expect(page.getByText('DUAL-SITE SIMULATION', { exact: true })).toBeVisible();
    await expect(page.getByText('REPORT & REMOVAL', { exact: true })).toBeVisible();
  });

  test('test "How It Works" anchor link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'How It Works' , exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/#how');
    await expect(page.getByRole('heading', { name: 'Detection in 3 Simple Steps' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'UPLOAD YOUR IMAGE', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SCAN THE DATABASE', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'TAKE ACTION', exact: true })).toBeVisible();
  });

  test('test "Face AI" anchor link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Face AI' , exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/#face-section');
    await expect(page.getByRole('heading', { name: 'Know When Your Face Is Exposed' })).toBeVisible();
    await expect(page.getByText('LOCAL INFERENCE', { exact: true })).toBeVisible();
    await expect(page.getByText('TINY FACE DETECTOR', { exact: true })).toBeVisible();
    await expect(page.getByText('PRIVACY WARNINGS', { exact: true })).toBeVisible();
  } );

  test('test "Tech Stack" anchor link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Tech Stack' , exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/#tech');
    await expect(page.getByRole('heading', { name: '100% Free & Open Source Stack' })).toBeVisible();
    await expect(page.getByText('Node.js', { exact: true })).toBeVisible();
    await expect(page.getByText('Express.js', { exact: true })).toBeVisible();
    await expect(page.getByText('MySQL', { exact: true })).toBeVisible();
    await expect(page.getByText('face-api.js', { exact: true })).toBeVisible();
    await expect(page.getByText('Sharp', { exact: true })).toBeVisible();
    await expect(page.getByText('bcryptjs + JWT', { exact: true })).toBeVisible();
    await expect(page.getByText('Multer', { exact: true })).toBeVisible();
    await expect(page.getByText('Vanilla JS', { exact: true })).toBeVisible();
  } );
});




