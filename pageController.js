const pageScraper = require('./pageScraper')

async function scrapeAll(browserInstance){
    let browser
    try{
        browser = await browserInstance
        await pageScraper.scrapper(browser)
    } catch(err) {
        console.log("Could not resolve the browser instance => ", err)
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)