const pageScraper = require('./pageScraper')

async function scrapeAll(browserInstance, resolver){
    let browser
    try{
        browser = await browserInstance
        await pageScraper.scraper(browser, resolver)
    } catch(err) {
        console.log("Could not resolve the browser instance => ", err)
    }
}

module.exports = (browserInstance, resolver) => scrapeAll(browserInstance, resolver)
