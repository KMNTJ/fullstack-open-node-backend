let persons = require("./persons.json");

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((note) => note.id)) : 0;
  return maxId + 1;
};

const info = () => {
  return (
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>`
  )
};

const createPerson = (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  const person = {
    id: generateId(),
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

const deletePerson = (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((n) => n.id !== id);
  return response.status(204).end();
};

module.exports = {
  createPerson,
  getPerson,
  getPersons,
  deletePerson,
  info,
};
