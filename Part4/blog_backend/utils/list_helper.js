const dummy = (blogs) => {
  if (blogs) return 1
}
const totalLikes = (blogs) => blogs.reduce((acc, val) => acc + val.likes, 0)

//const favoriteBlog = (blogs) => blogs.reduce((acc, val) => acc < val.likes ? val.likes : acc, 0)
const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((acc, val) => {
    if(acc.likes < val.likes) return val
    return acc
  })

  delete favoriteBlog.__v
  delete favoriteBlog._id
  delete favoriteBlog.url
  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}