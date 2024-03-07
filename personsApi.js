const PhoneNumber = require("./models/phoneNumber");
let persons = require("./persons.json");

const info = () => {
  return `<div>
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  </div>`;
};

const saveNumber = (newName, newNumber) => {
  const phoneNumber = new PhoneNumber({
    name: newName,
    number: newNumber,
  });
  return phoneNumber.save();
};

const addPerson = (body) =>
  saveNumber(body.name, body.number).then((result) => {
    const person = {
      id: result.id,
      name: result.name,
      number: result.number,
    };
    persons = persons.concat(person);
    return person;
  });

const createPerson = (request, response) => {
  const body = request.body;
  const personExists = persons.find((p) => p.name === body.name);
  if (personExists) {
    return response.status(400).json({
      error:
        "Given name already exists. Cannot create new record with same name.",
    });
  }
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and number are mandatory fields.",
    });
  }

  addPerson(body).then((person) => {
    return response.json(person);
  });
};

const getPerson = (request, response, next) => {
  PhoneNumber.findById(request.params.id)
    .then((phoneNum) => {
      if (phoneNum) {
        response.json(phoneNum);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
};

const listAllNumbers = () => {
  return PhoneNumber.find({});
};

const getPersons = (request, response) => {
  listAllNumbers().then((allNumbers) => {
    return response.json(allNumbers);
  });
};

const updatePerson = (request, response, next) => {
  const body = request.body;

  const updateWith = {
    name: body.name,
    number: body.number,
  };

  PhoneNumber.findByIdAndUpdate(request.params.id, updateWith, { new: true })
    .then((updatedInfo) => {
      response.json(updatedInfo);
    })
    .catch((error) => next(error));
};

const deletePerson = (request, response, next) => {
  PhoneNumber.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
};

module.exports = {
  createPerson,
  getPerson,
  getPersons,
  updatePerson,
  deletePerson,
  info,
};
