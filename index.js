const browserObject = require('./browser') 
const scraperController = require('./pageController')
const resolver = require("./database/mongodb")

const browserInstance = browserObject.startBrowser()
scraperController(browserInstance, resolver)