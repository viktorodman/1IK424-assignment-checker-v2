const Submission = require('../models/submission')

const saveSubmission = async (req, res, next) => {
  const { username, url, pass } = req.body

  try {
    await Submission.findOneAndUpdate(
      { username },
      { username, url, pass, corrected: false, handed_in: Date.now() },
      { new: true, upsert: true }
    )
    res.send({ message: 'Successfully saved or updated existing submission' })
  } catch (error) {
    res.send(error)
  }
}

const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({})
    res.send({ submissions })
  } catch (error) {
    res.send({ error })
  }
}

const updateSubmission = async (req, res, next) => {
  try {
    const submission = req.body.submission
    await Submission.findOneAndUpdate(
      { username: submission.username },
      submission,
      {
        new: true
      }
    )
    res.send({ message: 'Ok' })
  } catch (error) {
    res.send({ error })
  }
}

module.exports = {
  saveSubmission,
  getSubmissions,
  updateSubmission
}
