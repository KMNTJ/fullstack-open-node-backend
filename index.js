require("dotenv").config();
const requestLogger = require("./requestLogger");
const errorHandler = require("./errorHandler");
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

app.post("/api/persons", (request, response, next) => {
  return personApi.createPerson(request, response, next);
});

app.put("/api/persons/:id", (request, response, next) => {
  return personApi.updatePerson(request, response, next);
});

app.get("/api/persons/:id", (request, response, next) => {
  return personApi.getPerson(request, response, next);
});

app.get("/api/persons", (request, response, next) => {
  return personApi.getPersons(request, response, next);
});

app.get("/api/info", (request, response, next) => {
  return response.send(personApi.info(request, response, next));
});

app.delete("/api/persons/:id", (request, response, next) => {
  return personApi.deletePerson(request, response, next);
});

const unknownEndopoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndopoint);
app.use(errorHandler.errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
