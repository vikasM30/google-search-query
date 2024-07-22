const puppeteer = require('puppeteer');

const searchGoogle = async (searchQuery) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.type('input[name="q"]', searchQuery);
    await page.$eval('input[name=btnK]', button => button.click());
    await page.waitForSelector('div[id=search]');
    await page.screenshot({path: 'example.png'});
    const searchResults = await page.$$eval('div[class=bkWMgd]', results => {
        let data = [];

        results.forEach(parent => {

            const ele = parent.querySelector('h2');

            if (ele === null) {
                return;
            }

            let gCount = parent.querySelectorAll('div[class=g]');

            if (gCount.length === 0) {
                gCount = parent.querySelectorAll('div[class=srg] > div[class=g]');
            }

            gCount.forEach(result => {
                const title = result.querySelector('div[class=rc] > div[class=r] > a >  h3').innerText;

                const url = result.querySelector('div[class=rc] > div[class=r] > a').href;

                const desciption = result.querySelector('div[class=rc] > div[class=s] > div > span[class=st]').innerText;

                data.push({title, desciption, url});
            });
        });
        return data;
    });

    await browser.close();

    return searchResults;
};

module.exports = searchGoogle;