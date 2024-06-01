require('dotenv').config()
const {Sequelize, Model, DataTypes} = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Note extends Model {}
Note.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscores: true,
  timestamps: false,
  modelName: 'note'
})
app.use(express.json())

app.get('/api/notes', async(req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

app.post('/api/notes', async (req, res) => {
  console.log('req.body', req.body)
  
  try {
    const note = await Note.create(req.body)
    res.json(note)  
  } catch (e){
    return res.status(400).json({e})
  }
})

const PORT = process.nextTick.PORT || 3001
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})