const express = require('express')
const scrapeController = require('../controllers/scrapeController')
const submissionsController = require('../controllers/submissionsController')
const router = express.Router()

router.get('/scrape/*', scrapeController.scrape)
router.post('/submit', scrapeController.submit)

router.get('/submissions', submissionsController.getSubmissions)
router.post('/submissions', submissionsController.saveSubmissions)

module.exports = router
