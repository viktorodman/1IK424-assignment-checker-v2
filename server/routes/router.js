const express = require('express')
const scrapeController = require('../controllers/scrapeController')
const router = express.Router()

router.get('/', scrapeController.index)

module.exports = router
