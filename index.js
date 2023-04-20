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
})

// Export the Express API
module.exports = app
