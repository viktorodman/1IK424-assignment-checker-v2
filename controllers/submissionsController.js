const Submission = require('../models/submission')

const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({})
    console.log(submissions[0])
    res.send({ submissions })
  } catch (error) {
    res.send({ error })
  }
}

const saveSubmission = async (req, res, next) => {
  try {
    const submission = req.body.submission
    await Submission.findOneAndUpdate(submission.username, submission, {
      new: true
    })
    res.send({ message: 'Ok' })
  } catch (error) {
    res.send({ error })
  }
}

module.exports = {
  getSubmissions,
  saveSubmission
}
