import express from 'express'
import { PersonModel } from './models/person'
import morgan from 'morgan'
import type { Request, Response, NextFunction } from 'express'

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req: Request) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

app.get('/api/persons', async (req: Request, res: Response) => {
  const persons = await PersonModel.find({})
  res.json(persons)
})

app.get('/api/persons/:id', async (req: Request, res: Response) => {
  const person = await PersonModel.findById(req.params.id)
  if (!person) {
    return res.status(404).end()
  }
  return res.json(person)
})

app.get('/api/info', async (req: Request, res: Response) => {
  const personsCount = await PersonModel.countDocuments()
  res.send(`
			<p>Phonebook has info for ${personsCount} people</p>
			<p>${new Date()}</p>
		`)
})

interface PersonBody {
  name: string;
  number: string;
}

app.post(
  '/api/persons',
  async (req: Request<object, object, PersonBody>, res: Response) => {
    const { name, number } = req.body
    const cleanName = name ? name.toString().trim() : ''
    const cleanNumber = number ? number.toString().trim() : ''

    if (!cleanName || !cleanNumber) {
      return res.status(400).json({ error: 'Name and number are required' })
    }

    const existingPerson = await PersonModel.findOne({ name: cleanName })
    if (existingPerson) {
      return res.status(400).json({ error: 'Name must be unique' })
    }

    const newPerson = new PersonModel({
      name: cleanName,
      number: cleanNumber,
    })
    await newPerson.save()
    console.log(`added ${cleanName} number ${cleanNumber} to phonebook`)
    res.status(201).json(newPerson)
  },
)

app.put('/api/persons/:id', async (req: Request, res: Response) => {
  const { name, number } = req.body
  const cleanName = name ? name.toString().trim() : ''
  const cleanNumber = number ? number.toString().trim() : ''

  const person = await PersonModel.findById(req.params.id)
  if (!person) {
    return res.status(404).end()
  }
  person.name = cleanName
  person.number = cleanNumber

  const updatedPerson = await person.save()
  res.json(updatedPerson)
})

app.delete('/api/persons/:id', async (req: Request, res: Response) => {
  await PersonModel.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error caught:', error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Unknown format ID' })
  } else if (error.name === 'ValidationError') {
    const firstValidationError = Object.values(error.errors)[0] as any
    const errorMessage = firstValidationError.message
    console.log(errorMessage)
    return res.status(400).json({ error: errorMessage })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
