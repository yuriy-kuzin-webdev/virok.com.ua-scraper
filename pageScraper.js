const scraperObject = {
    url: 'https://virok.com.ua/ua/katalog.html',
    async scraper(browser) {
        const page = await browser.newPage()
        console.log(`Navigating to ${this.url}...`)
        await page.goto(this.url)
		const scrapedData = [];
        // Wait for the required DOM to be rendered
		async function scrapeCurrentPage(){
        	await page.waitForSelector('.jet')
        	const urls = await page.$$eval('li.item.last', links => {
            	links = links.map(el => el.querySelector('.product-image > .img-caption .caption-block a').href)
            	return links
        	})

        	//Looping throught each of the links, open a new page instance and get the relevant data from them
        	const pagePromise = (link) => new Promise(async(resolve, reject) => {
				const dataObj = {}
				const newPage = await browser.newPage()
				await newPage.goto(link)
				dataObj['article'] = await newPage.$eval('#product_addtocart_form > div.product-shop > div.number-sku', text => {
					// Strip new line and tab spaces
					text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "")
					return text.split(':')[1].trimRight()
				});
            
				dataObj['imageUrl'] = await newPage.$eval('#image-main', img => img.src)
				dataObj['description'] = await newPage.$eval('#product_addtocart_form > div.product-shop > div.product-name > span', span => span.textContent)
				try{
					dataObj['category'] = await newPage.$eval('body > div > div > div.main-container.col1-layout > div > div.breadcrumbs > ul > li:nth-child(3) > a', a => a.title)
				}catch(err){
					console.log(err)
				}
				try{
					dataObj['type'] = await newPage.$eval('body > div > div > div.main-container.col1-layout > div > div.breadcrumbs > ul > li:nth-last-child(2) > a', a => a.title)
				}catch(err){
					console.log(err)
				}

				resolve(dataObj)
				await newPage.close()
			});

        	for(link in urls){
				const currentPageData = await pagePromise(urls[link])
				scrapedData.push(currentPageData)
			}

			let nextButtonExist = false
			try{
				const nextButton = await page.$eval('.next.i-next', a => a.textContent)
				nextButtonExist = true
			} catch(err) {
				nextButtonExist = false
			}
			if(nextButtonExist){
				await page.click('.next.i-next')
				return scrapeCurrentPage()
			}
			await page.close()
			return scrapedData
    	}
		let data = await scrapeCurrentPage()
		console.log(data)
		return data
	}
}

module.exports = scraperObject