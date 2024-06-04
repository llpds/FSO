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
Note.sync()
app.use(express.json())

app.get('/api/notes', async(req, res) => {
  const notes = await Note.findAll()
  console.log('notes', notes.map(n => n.toJSON()))
  console.log('notes', JSON.stringify(notes))
  res.json(notes)
})

app.get('/api/notes/:id', async(req, res)=> {
  const note = await Note.findByPk(req.params.id)
  if(note) {
    console.log('note', note.toJSON())
    res.json(note)
  } else {
    res.status(404).end()
  } 
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

app.put('/api/notes/:id', async (req, res) =>{
  const note = await Note.findByPk(req.params.id)
  if(note){
    note.important = req.body.important
    await note.save()
    res.json(note)
  }else{
    req.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})