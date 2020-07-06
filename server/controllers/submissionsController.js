const Submission = require('../models/submission')

const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({})
    console.log(submissions)
    res.send({ submissions })
  } catch (error) {
    res.send({ error })
  }
}

module.exports = {
  getSubmissions
}
