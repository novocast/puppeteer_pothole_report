const puppeteer = require('puppeteer');

const targetUrl = 'https://potholereport.com';
const searchCode = 'EH112AQ';

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(targetUrl);
    console.log('lets go');
    await page.type('[name="rn_searchBox"]', searchCode, {delay: 100});
    await page.click('#rn_CAGSearch_6_searchGo',{delay: 200});
    await page.waitForSelector('select#rn_CAGSearch_6_selectCAG');
    await page.waitForSelector('select#rn_CAGSearch_6_selectCAG option[value="1"]');
    await page.select('select#rn_CAGSearch_6_selectCAG', '1');
    await page.waitForSelector('#map_gc');
    await page.click('#rn_MapWidget .copyright-smt');
    const header = await page.$('#rn_MapWidget .copyright-smt');
    const rect = await page.evaluate((header) => {
        const {top, left, bottom, right} = header.getBoundingClientRect();
        return {top, left, bottom, right};
    }, header);
    await page.click('.esriSimpleSliderDecrementButton');
    await page.waitFor(1500);
    await page.mouse.click((rect.left + 120), (rect.top - 68));
    await page.waitFor(1500);
    await page.click('#rn_CEC_SelectionInput_15');
    await page.waitFor(1500);
    await page.waitForSelector('#rn_CEC_SelectionInput_15 select');
    await page.waitForSelector('#rn_CEC_SelectionInput_15 select option[value="66"]');
    await page.select('#rn_CEC_SelectionInput_15 select', '66');
    await page.waitFor(1200);
    await page.waitForSelector('#rn_CEC_SelectionInput_21 select');
    await page.waitForSelector('#rn_CEC_SelectionInput_21 select option[value="69"]');
    await page.select('#rn_CEC_SelectionInput_21 select', '69');
    await page.waitFor(600);
    await page.waitForSelector('#rn_CEC_SelectionInput_22 select');
    await page.waitForSelector('#rn_CEC_SelectionInput_22 select option[value="97"]');
    await page.select('#rn_CEC_SelectionInput_22 select', '97');
    await page.waitFor(1200);
    await page.waitForSelector('#rn_CEC_SelectionInput_23 select');
    await page.waitForSelector('#rn_CEC_SelectionInput_23 select option[value="100"]');
    await page.select('#rn_CEC_SelectionInput_23 select', '100');
    await page.waitFor(600);
    await page.waitForSelector('select[id="rn_CEC_SelectionInput_21_Incident.CustomFields.c.road_problem_type"]');
    await page.waitFor(2600);
    console.log('Submit');

    await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click('button#rn_OCS_FormSubmit_28_Button') // Clicking the link will indirectly cause a navigation
    ]);
    console.log('success');
    await page.waitFor(2600);
    console.log('all done');
    await browser.close();
})();