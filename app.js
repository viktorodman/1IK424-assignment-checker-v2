const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./routes/router')
require('dotenv').config()
const mongoose = require('./config')

const app = express()

mongoose.connect().catch((error) => {
  console.error(error)
  process.exit(1)
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', router)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))
