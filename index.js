const express = require('express')
const puppeteer = require('puppeteer');
const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.get('/newscrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    //await page.setViewport({ width: 1920, height: 1080 });
    await page.setViewport({ width: 0, height: 0 });
    await page.goto('https://www.rogers.com/consumer/profile/signin');

    await page.waitForTimeout(5000);

  
    await page.waitForSelector('.ds-formField__inputContainer');
    await page.click('.ds-formField__inputContainer');

    await page.waitForTimeout(5000);

  
    await page.waitForSelector('#ds-form-input-id-0');
    await page.type('#ds-form-input-id-0', 'iamvasantsharma@gmail.com');
  
    await page.waitForTimeout(5000);

    
    await page.waitForSelector('.-primary');

    
    await page.click('.-primary');

    await page.waitForTimeout(5000);

  
    await page.waitForSelector('.ds-formField__inputContainer input#input_password');
    await page.type('.ds-formField__inputContainer input#input_password', 'Basant@8767');
  
    await page.waitForTimeout(5000);

    await page.waitForSelector('.-primary');
    await page.click('.-primary');
  
    await page.waitForTimeout(5000);

    await page.waitForSelector('.ds-button.-primary');
    await page.click('.ds-button.-primary');
  
    await page.waitForTimeout(5000);

    await page.waitForSelector('button.mr-4.w-100.ds-button.ds-corners.ds-pointer.text-center.mw-100.d-inline-block.-tertiary.-small');
    await page.click('button.mr-4.w-100.ds-button.ds-corners.ds-pointer.text-center.mw-100.d-inline-block.-tertiary.-small');
  
    console.log(await page.title());
  
   // await browser.close();
  
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const message = 'It works!\n';
    const version = 'NodeJS ' + process.versions.node + '\n';
    const response = [message, version].join('\n');
    res.end(response);
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

// Export the Express API
module.exports = app
