const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())

morgan.token('data', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

const generateId = () => {
  const id =  Number((Math.random() * 1000000000).toFixed(0))
  return id
}

app.get('/', (request, response) => {
    response.send('<h1>Phonebook backend, use <a href="/api/persons"> API </a> </h1>')
  })

app.get('/info', (request, response) => {
    const date = new Date()
    const infoData = `<p> Phonebook has info for ${persons.length} people <br /><br /> ${date} </p>`
    response.send(infoData)
  })
  
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if(person) {
    response.json(person)
  } else{
    response.status(404).end()
  }
})

app.get('/api/persons/', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post ('/api/persons', (request, response) => {

  const body = request.body
  if(!body.name || !body.number){
    return response.status(400).json({error: 'name or number info is missing'})
  }

  const nameCorrespondence = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())

  if(nameCorrespondence) return response.status(400).json({ error: 'name must be unique' })


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})



const PORT = 3005
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})