const scrapeController = {}

scrapeController.index = (req, res, next) => {
  res.send({ message: 'Hello from server' })
}

module.exports = scrapeController
