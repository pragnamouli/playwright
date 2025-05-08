import {test, expect} from "@playwright/test"; 
  test.beforeEach('open url', async ({page})=>{
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(response.status()).toBe(200);
  await expect(page).toHaveURL('https://demoqa.com/');
  await expect(page.locator('img[src="/images/Toolsqa.jpg"]')).toBeVisible();
  });

// Re-direction to the main page
test('Logo redirected to the main page successfully', async ({page})=>{
  await page.click('text=Elements');
  await expect(page).toHaveURL(/.*elements/);
  await page.click('img[src="/images/Toolsqa.jpg"]');
  await expect(page).toHaveURL('https://demoqa.com/','page is redirected to the main page successfully');
});

// Validate Text Box Input and Submission
test('Navigate to Elements section from homepage Fill out Text Box and submit form', async ({ page }) => {   
  await page.goto('https://demoqa.com/text-box');
  await page.fill('#userName', 'Pragna D');
  await page.fill('#userEmail', 'pdamera@example.com');
  await page.fill('#currentAddress', '123 hyderabad');
  await page.fill('#permanentAddress', 'Narsingi Main road');
  await page.click('#submit');
  await expect(page.locator('#output')).toContainText('Pragna D');
  await expect(page.locator('#output')).toContainText('pdamera@example.com');
});

// check box input and verification
test('Select checkbox and verify result', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');
  await page.click('label[for="tree-node-home"] span.rct-checkbox');
  await expect(page.locator('#result')).toContainText('You have selected');
});

// Radio button validation
test('Select radio button and validate', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button');
  await page.click('label[for="yesRadio"]');
  await expect(page.locator('.text-success')).toHaveText('Yes');
});

// Trees tructure validation
test('Expand all nodes in checkbox tree', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');
  await page.click('button[title="Expand all"]');
  const folders = await page.locator('.rct-node-expanded');
  await expect(await folders.count()).toBeGreaterThan(1);
});

// Drag and Drop
test.only('Perform drag and drop', async ({ page }) => {
  await page.goto('https://demoqa.com/droppable');
  await page.dragAndDrop('#draggable', '#droppable');
  await expect(page.locator('#droppable p').first()).toHaveText('Dropped!');
});

// Button double click
test('Double click button and verify message', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');
  await page.dblclick('#doubleClickBtn');
  await expect(page.locator('#doubleClickMessage')).toContainText('You have done a double click');
});

// right click on the button and validate the message
test('Right click button and verify message', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');
  await page.click('#rightClickBtn', { button: 'right' });
  await expect(page.locator('#rightClickMessage')).toContainText('You have done a right click');
});

// Search in table and validate the selected text
test('Search table for specific user', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  await page.fill('#searchBox', 'Cierra');
  await expect(page.locator('.rt-tbody')).toContainText('Cierra');
});

// Validation for uploading a file+
test('Upload a file and verify file name', async ({ page }) => {
  await page.goto('https://demoqa.com/upload-download');
  await page.setInputFiles('#uploadFile', 'tests/sampleFile.txt');
  await expect(page.locator('#uploadedFilePath')).toContainText('sampleFile.txt');
});

