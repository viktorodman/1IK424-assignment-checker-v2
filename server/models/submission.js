const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, required: true, unique: true },
  url: { type: String },
  pass: { type: Boolean },
  corrected: { type: Boolean, default: false }
})

const submission = mongoose.model('submission', submissionSchema)

module.exports = submission
