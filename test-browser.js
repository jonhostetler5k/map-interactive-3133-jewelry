import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  console.log('Opening http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Take a screenshot
  await page.screenshot({ path: 'screenshot-sidebar.png', fullPage: false });
  console.log('Screenshot saved to screenshot-sidebar.png');
  
  // Get the sidebar HTML
  const sidebarContent = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    return nav ? nav.innerHTML : 'Nav not found';
  });
  
  console.log('\n=== SIDEBAR CONTENT ===');
  console.log(sidebarContent.substring(0, 1000));
  
  // Check console logs
  const logs = [];
  page.on('console', msg => logs.push(msg.text()));
  
  await page.waitForTimeout(1000);
  
  console.log('\n=== CONSOLE LOGS ===');
  logs.forEach(log => console.log(log));
  
  // Get all section titles
  const sections = await page.evaluate(() => {
    const buttons = document.querySelectorAll('nav button');
    return Array.from(buttons).map(btn => btn.textContent.trim());
  });
  
  console.log('\n=== SECTION TITLES ===');
  sections.forEach((title, idx) => console.log(`${idx + 1}. ${title}`));
  
  console.log('\nBrowser will stay open for 30 seconds for you to inspect...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();

