const browserObject = require('./browser') 
const scraperController = require('./pageController')

const browserInstance = browserObject.startBrowser()
scraperController(browserInstance, (data) => console.log(data))