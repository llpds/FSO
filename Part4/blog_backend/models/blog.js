const mongoose =require('mongoose')

// these constraints apply only when creating
// when updating (put) constraints are written in the controller according to the method
// in this case see: controllers/blogs blogsRouter.put
// NB if you want to change smth in Schema should to changhe same thing in controller
const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    minLength: 1,
    required: true
  },
  author: {
    type:String,
    minLength: 1,
    required: true
  },
  url: {
    type:String,
    minLength: 5,
    required: true
  },
  likes: Number
})

blogSchema.set('toJSON',{
  transform:(document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)