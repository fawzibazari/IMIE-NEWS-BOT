import puppeteer from 'puppeteer';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

async function Login() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000/login', {
    waitUntil: 'networkidle2',
  });
  await page.type(
    '#root > div > div > div:nth-child(3) > input[type=text]',
    process.env.USER_EMAIL as string,
  );
  await page.type(
    '#root > div > div > div:nth-child(4) > input[type=password]',
    process.env.USER_PASS as string,
  );
  await page.click('#root > div > div > button');
  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
  await delay(2000);
  await page.goto('http://localhost:3000/new-article');
  page.waitForNavigation({ waitUntil: 'networkidle2' });
  await delay(1000);
  await page.type(
    '#root > div > div:nth-child(3) > form > input',
    'a test from the bot',
  );
  await page.type(
    '#root > div > div:nth-child(3) > form > div:nth-child(4) > input[type=text]',
    'a test from the bot',
  );
  await page.type(
    '#root > div > div:nth-child(3) > form > div:nth-child(5) > input[type=text]',
    '  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkibW00ezNaVH1rSvZQW3o77v6CSs94C2dKg&usqp=CAU',
  );
  await page.type(
    '#root > div > div:nth-child(3) > form > div:nth-child(6) > input[type=text]',
    'testo',
  );
  await page.click('#root > div > div:nth-child(3) > form > button');
  await delay(500);
  await page.screenshot({ path: 'hey.png' });
}

Login();
