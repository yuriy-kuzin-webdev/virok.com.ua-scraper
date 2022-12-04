const scrapperObject = {
    url: 'https://virok.com.ua/ua',
    async scrapper(browser) {
        let page = await browser.newPage()
        console.log(`Navigating to ${this.url}...`)
        await page.goto(this.url)
    }
}

module.exports = scrapperObject