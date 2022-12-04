const puppeter = require('puppeteer')

async function startBrowser(){
    let browser;
    try{
        console.log("Opening the browser.........")
        browser = await puppeter.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            ignoreHTTPSErrors: true
        })
    } catch (err) {
        console.log("Could not create a browser instance => : ", err)
    }
    return browser
}

module.exports = {
    startBrowser
}
