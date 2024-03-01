let persons = require("./persons.json");

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((note) => note.id)) : 0;
  return maxId + 1;
};

const generateRandomId = () => {
  return Math.round(Math.random() * 1000000);
};

const info = () => {
  return `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>`;
};

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

  const person = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  return response.json(person);
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

const getPersons = (request, response) => {
  return response.json(persons);
};

const updatePerson = (request, response) => {
  const incomingInformation = request.body;
  console.log("incoming", incomingInformation);
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
    return response.json(incomingInformation)
  }
  else {
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
