require('dotenv').config()
const {Sequelize, Model, DataTypes} = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscores: true,
  timestamps: false,
  modelName: 'blog'
})
Blog.sync()
app.use(express.json())

app.get('/api/blogs', async(req, res) => {
  const blogs = await Blog.findAll()
  // console.log('blogs', JSON.stringify(blogs))
  res.json(blogs)
})

app.get('/api/blogs/:id', async(req, res)=> {
  const blog = await Blog.findByPk(req.params.id)
  if(blog) {
    console.log('blog', blog.toJSON())
    res.json(blog)
  } else {
    res.status(404).end()
  } 
})

app.post('/api/blogs', async (req, res) => {
  console.log('req.body', req.body)
  
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)  
  } catch (e){
    return res.status(400).json({e})
  }
})

app.delete('/api/blogs/:id', async (req, res) =>{
  const blog = await Blog.findByPk(req.params.id)
  if(blog){
    await blog.destroy()
    res.json(`${blog.title} deleted`)
  }else{
    req.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})