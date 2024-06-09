const Blog = require('./blog')
const User = require('./user')
const Readinglists = require('./readinglists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglists, as: 'readings'})
Blog.belongsToMany(User, { through: Readinglists, as: 'users_choice'})

module.exports = {
  Blog, User, Readinglists
}