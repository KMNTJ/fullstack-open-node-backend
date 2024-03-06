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

const addPerson = (body) => saveNumber(body.name, body.number).then((result) => {
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

  addPerson(body).then(person => {
    return response.json(person)
  })
};

const getPerson = (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((n) => n.id === id);
  if (person) {
    return response.json(person);
  } else {
    return response.status(404).end();
  }
};

const listAllNumbers = () => {
  return PhoneNumber.find({});
};

const getPersons = (request, response) => {
  listAllNumbers().then((allNumbers) => {
    return response.json(allNumbers);
  });
};

const updatePerson = (request, response) => {
  const incomingInformation = request.body;
  const found = persons.find((pers) => pers.id === incomingInformation.id);
  if (found) {
    persons = persons.map((pers) =>
      pers.id === incomingInformation.id
        ? {
            id: incomingInformation.id,
            name: incomingInformation.name,
            number: incomingInformation.number,
          }
        : pers
    );
    return response.json(incomingInformation);
  } else {
    return response.status(404).end();
  }
};

const deletePerson = (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((n) => n.id !== id);
  return response.status(204).end();
};

module.exports = {
  createPerson,
  getPerson,
  getPersons,
  updatePerson,
  deletePerson,
  info,
};
