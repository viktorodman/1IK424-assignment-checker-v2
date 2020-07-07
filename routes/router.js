const express = require('express')
const scrapeController = require('../controllers/scrapeController')
const submissionsController = require('../controllers/submissionsController')
const router = express.Router()

router.get('/scrape/*', scrapeController.scrape)
router.get('/submissions', submissionsController.getSubmissions)

router.post('/submission', submissionsController.saveSubmission)
router.patch('/submission', submissionsController.updateSubmission)

module.exports = router
