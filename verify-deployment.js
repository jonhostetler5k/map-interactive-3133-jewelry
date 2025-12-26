import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const url = 'https://map-interactive-3133-jewelry.vercel.app';
  console.log(`Checking ${url}...`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Check if the title exists or some specific content
    const title = await page.title();
    console.log(`Page title: ${title}`);
    
    // Check for "EXECUTIVE SUMMARY" which is the first section
    const content = await page.textContent('body');
    if (content.includes('EXECUTIVE SUMMARY')) {
      console.log('✅ Content "EXECUTIVE SUMMARY" found! Site is working.');
    } else {
      console.log('❌ Content "EXECUTIVE SUMMARY" not found. Checking for errors...');
      const bodyHTML = await page.innerHTML('body');
      console.log('Body HTML preview:', bodyHTML.substring(0, 500));
    }
    
    // Check for the navigation buttons
    const navButtons = await page.$$eval('nav button', buttons => buttons.map(b => b.textContent.trim()));
    console.log('Navigation buttons found:', navButtons.join(', '));
    
    if (navButtons.length > 0) {
      console.log('✅ Navigation buttons found! Navigation is working.');
    } else {
      console.log('❌ No navigation buttons found.');
    }

  } catch (error) {
    console.error(`❌ Error checking site: ${error.message}`);
  } finally {
    await browser.close();
  }
})();

