
const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id == id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'Name or number missing'})
  }

  const maxId = persons.length > 0 ? persons.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1


  const person = {
    name: body.name,
    number: body.number,
    id: maxId + 1
  }
  if(!persons.some(p => p.name === person.name)) {
    persons = persons.concat(person)    
    response.json(persons)
  } else {
    return response.status(400).json({error: 'Name must be unique'})
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})