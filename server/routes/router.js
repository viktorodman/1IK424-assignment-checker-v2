const express = require('express')
const scrapeController = require('../controllers/scrapeController')
const router = express.Router()

router.get('/scrape/*', scrapeController.scrape)
router.post('/submit', scrapeController.submit)

module.exports = router
