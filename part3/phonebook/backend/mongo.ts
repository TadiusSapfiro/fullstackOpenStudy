import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://vzelentinov_db_user:${password}@cluster0.zefufii.mongodb.net/personsApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })
interface IPerson {
  name: string;
  number: string;
}

const personSchema = new mongoose.Schema<IPerson>({
  name: { type: String, required: true },
  number: String,
})

const Person = mongoose.model<IPerson>('Person', personSchema)

if (personName && number) {
  const person = new Person({
    name: personName,
    number: number,
  })

  person
    .save()
    .then(() => {
      console.log(`added ${personName} number ${number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((error) => {
      console.error('Ошибка при сохранении:', error.message)
      mongoose.connection.close()
    })
} else {
  Person.find({}).then((result) => {
    const personsData = result
      .map((person: { name: string; number: string }) => {
        return `${person.name} ${person.number}`
      })
      .join('\n')
    console.log(`phonebook: \n${personsData}`)
    mongoose.connection.close()
  })
}
