const cheerio = require('cheerio')
const rp = require('request-promise')

const scrapeController = {}

scrapeController.scrape = async (req, res, next) => {
  const url = req.params[0]

  const result = await scrapeMainPage(url)
  res.send(result)
}

const scrapeMainPage = (url) => {
  const options = setupOptions(url)

  return rp(options)
    .then(($) => {
      const h1 = $('h1').length
      const h2 = $('h2').length
      const h3 = $('h3').length
      const p = $('p').length
      const columns = $('div.wp-block-column').length

      return {
        h1,
        h2,
        h3,
        p,
        columns
      }
    })
    .catch((err) => {
      console.log(err)
      return { error: 'Failed to scrape website' }
    })
}

const setupOptions = (url) => {
  return {
    uri: url,
    transform: (body) => {
      return cheerio.load(body)
    }
  }
}

module.exports = scrapeController
