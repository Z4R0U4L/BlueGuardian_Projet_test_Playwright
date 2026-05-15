import { test, expect } from '@playwright/test';
import { faker, tr } from '@faker-js/faker';

test('creates new post with image', async ({ page }) => {
    const name = faker.person.fullName();
    const caption = faker.lorem.sentence();
    await page.goto('http://localhost:3001/');
    await page.getByRole('button', { name: '+ Share Photo' }).click();
    await page.setInputFiles('#fileInput', './fixtures/images/test.png');
    await expect(page.locator('#previewImg')).toBeVisible();
    await page.fill('#usernameIn', name);
    await page.fill('#captionIn', caption);
    await page.getByRole('button', { name: 'Share Post' }).click();
    await expect(page.getByText('✅ Photo shared!')).toBeVisible();
    await expect(page.getByRole('strong').filter({ hasText: name })).toBeVisible();
    await expect(page.getByText(caption)).toBeVisible();
});

test('like button toggles between 🤍 and ❤️', async ({ page }) => {
    const name = faker.person.fullName();
    const caption = faker.lorem.sentence();
    await page.goto('http://localhost:3001/');
    await page.getByRole('button', { name: '+ Share Photo' }).click();
    await page.setInputFiles('#fileInput', './fixtures/images/test.png');
    await expect(page.locator('#previewImg')).toBeVisible();
    await page.fill('#usernameIn', name);
    await page.fill('#captionIn', caption);
    await page.getByRole('button', { name: 'Share Post' }).click();
    await expect(page.getByText('✅ Photo shared!')).toBeVisible();
    const likeBtn = page.locator('.act-btn').first();
    await expect(likeBtn).toHaveText('🤍');
    await likeBtn.click();
    await expect(likeBtn).toHaveText('❤️');
    await likeBtn.click();
    await expect(likeBtn).toHaveText('🤍');
});

test('comment and share buttons exist', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    const buttons = await page.locator('.act-btn').all();
    expect(buttons.length).toBeGreaterThan(0);
    await expect(buttons[1]).toHaveText('💬');
    await expect(buttons[2]).toHaveText('📤');
});

test('modal closes and resets form', async ({ page }) => {
    const name = faker.person.fullName();
    const caption = faker.lorem.sentence();
    await page.goto('http://localhost:3001/');
    await page.getByRole('button', { name: '+ Share Photo' }).click();
    await page.setInputFiles('#fileInput', './fixtures/images/test.png');
    await page.fill('#usernameIn', name);
    await page.fill('#captionIn', caption);
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: '+ Share Photo' }).click();
    await expect(page.locator('#usernameIn')).toHaveValue('');
    await expect(page.locator('#captionIn')).toHaveValue('');
    await expect(page.locator('#previewImg')).not.toBeVisible();
});

test('uses default username when field empty', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.getByRole('button', { name: '+ Share Photo' }).click();
    await page.setInputFiles('#fileInput', './fixtures/images/test.png');
    await page.fill('#usernameIn', ''); 
    await page.fill('#captionIn', 'No username test');
    await page.getByRole('button', { name: 'Share Post' }).click();
    await expect(page.getByText('anonymous').first()).toBeVisible();
});

test('username shows first letter in avatar', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.getByRole('button', { name: '+ Share Photo' }).click();
    await page.setInputFiles('#fileInput', './fixtures/images/test.png');
    await page.fill('#usernameIn', 'JohnDoe');
    await page.getByRole('button', { name: 'Share Post' }).click();
    await page.reload();
    await expect(page.locator('.avatar').first()).toHaveText('J');
}   );


