const scraperObject = {
    url: 'https://virok.com.ua/ua/katalog.html',
    async scraper(browser) {
        let page = await browser.newPage()
        console.log(`Navigating to ${this.url}...`)
        await page.goto(this.url)
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.jet')
        let urls = await page.$$eval('li.item.last', links => {
            links = links.map(el => el.querySelector('.product-image > .img-caption .caption-block a').href)
            return links
        })
        console.log(urls)
    }
}

module.exports = scraperObject