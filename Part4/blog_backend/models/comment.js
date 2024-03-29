const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  content:{
    type:String,
    minLength:1,
    required: true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
})

commentSchema.set('toJSON', {
  transform:(document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)