const puppy = require('puppeteer');

async function main(){
    let browser = await puppy.launch({
        headless : false,
        defaultViewport : null,
        args : [
            '--window-size=1920,1080',
          ],
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://chess.com");
    let buttons = await tab.$$(".index-button-title");
    await buttons[1].click();
    await tab.waitForSelector(".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-large.ui_v5-button-full");
    await tab.click(".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-large.ui_v5-button-full");
    let pages = await tab.$$(".v5-section-shadow-hover.v5-section-content.course-item");
    let pagesUrl = [];
    for(let i = 25; i < 27; i++){
        let url = await tab.evaluate(function(ele){
            return ele.getAttribute("href");
        },pages[i]);
        pagesUrl.push(url);
    }
    for(let i = 0;i < pagesUrl.length ;i++){
        await solveLesson(pagesUrl[i],tab,i);
    }
}

async function solveLesson(lessonUrl,tab,j){
    await tab.goto(lessonUrl);
    await tab.click(".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-large.ui_v5-button-full");
    await tab.waitForSelector(".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-full.actions-action");
    await tab.click(".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-full.actions-action");
    let k = (j == 0) ? 5 : 10;
    for(let i = 1;i <= k;i++){
    await tab.keyboard.press("Enter");
    await tab.keyboard.press("Enter");
    await tab.waitForSelector(".ui_v5-button-component.ui_v5-button-primary.actions-action");
    await tab.click(".ui_v5-button-component.ui_v5-button-primary.actions-action");
    }
}

main();