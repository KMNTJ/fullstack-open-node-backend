require("dotenv").config();
const requestLogger = require("./requestLogger");
const personApi = require("./personsApi");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger.requestLogger);
app.use(cors());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.post("/api/persons", (request, response) => {
  return personApi.createPerson(request, response);
});

app.put("/api/persons/:id", (request, response) => {
  return personApi.updatePerson(request, response);
});

app.get("/api/persons/:id", (request, response, next) => {
  return personApi.getPerson(request, response, next);
});

app.get("/api/persons", (request, response) => {
  return personApi.getPersons(request, response);
});

app.get("/api/info", (request, response) => {
  return response.send(personApi.info(request, response));
});

app.delete("/api/persons/:id", (request, response) => {
  return personApi.deletePerson(request, response);
});

const unknownEndopoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndopoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
