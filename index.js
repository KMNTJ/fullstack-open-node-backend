const requestLogger = require("./requestLogger");
const personApi = require('./personsApi')
const express = require("express");
const app = express();

app.use(express.json());
app.use(requestLogger.requestLogger);

app.post("/api/persons", (request, response) => {
  return personApi.createPerson(request, response)
});

app.get("/api/persons/:id", (request, response) => {
  return personApi.getPerson(request, response)
});

app.get("/api/persons", (request, response) => {
  return personApi.getPersons(request, response)
});


app.get("/api/info", (request, response) => {
  return response.send(personApi.info(request, response));
});

app.delete("/api/persons/:id", (request, response) => {
  return personApi.deletePerson(request, response)
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
