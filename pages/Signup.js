import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('#signupForm').first().getByPlaceholder('John Doe');
    this.emailInput = page.locator('#signupForm').first().getByPlaceholder('your@email.com');
    this.passwordInput = page.locator('#signupForm').first().getByPlaceholder('••••••••');
    this.submitButton = page.locator('#signupForm').first().getByRole('button', { name: 'CREATE ACCOUNT' });
  }

  async goto() {
    await this.page.goto('http://localhost:3000/');
    await this.page.getByRole('link', { name: 'Get Started' }).click();
    await this.page.getByRole('button', { name: 'Sign Up' }).click();
    await expect(this.page).toHaveURL('http://localhost:3000/app');
  }

  async register({ name, email, password }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.page).toHaveTitle('BlueGuardian — Dashboard');
  }
}