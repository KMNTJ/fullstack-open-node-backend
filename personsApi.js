const PhoneNumber = require('./models/phoneNumber')
let persons = require('./persons.json')

const info = (request, response, next) => {
  PhoneNumber.find({})
    .then((result) => {
      return response.send(
        `<div>
        <p>Phonebook has info for ${result.length} people</p>
        <p>${new Date()}</p>
        </div>`
      )
    })
    .catch((error) => next(error))
}

const saveNumber = (newName, newNumber) => {
  const phoneNumber = new PhoneNumber({
    name: newName,
    number: newNumber,
  })
  return phoneNumber.save()
}

const addPerson = (body, next) =>
  saveNumber(body.name, body.number)
    .then((result) => {
      const person = {
        id: result.id,
        name: result.name,
        number: result.number,
      }
      persons = persons.concat(person)
      return person
    })
    .catch((error) => next(error))

const createPerson = (request, response, next) => {
  const body = request.body
  const personExists = persons.find((p) => p.name === body.name)
  if (personExists) {
    return response.status(400).json({
      error:
        'Given name already exists. Cannot create new record with same name.',
    })
  }

  addPerson(body, next).then((person) => {
    return response.json(person)
  })
}

const getPerson = (request, response, next) => {
  PhoneNumber.findById(request.params.id)
    .then((phoneNum) => {
      if (phoneNum) {
        response.json(phoneNum)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
}

const getPersons = (request, response, next) => {
  PhoneNumber.find({})
    .then((allNumbers) => {
      return response.json(allNumbers)
    })
    .catch((error) => next(error))
}

const updatePerson = (request, response, next) => {
  const body = request.body

  const updateWith = {
    name: body.name,
    number: body.number,
  }

  PhoneNumber.findByIdAndUpdate(request.params.id, updateWith, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedInfo) => {
      response.json(updatedInfo)
    })
    .catch((error) => next(error))
}

const deletePerson = (request, response, next) => {
  PhoneNumber.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
}

module.exports = {
  createPerson,
  getPerson,
  getPersons,
  updatePerson,
  deletePerson,
  info,
}
