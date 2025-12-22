const express = require("express");
const morgan = require("morgan");
const app = express();

//initialize middleware
app.use(express.json())

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})

//use the logger
app.use(logger)

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//GET
app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  let person = persons.find((p) => p.id === id);
  if (!person) {
    response.status(404).end();
  } else {
    response.json(person);
  }
});

app.get("/info", (request, response) => {
  const now = new Date();
  response.send(`
        <p>Phonebook has info ${persons.length} people</p>

        <p>${now.toString()}</p>
        `);
});

//DELETE
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.sendStatus(204);
});

//POST
app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    response
      .status(400)
      .json({
        error: "The name or number is missing",
      })
      .end();
    return;
  }

  let existingPerson = persons.find((p) => p.name === name);
  if (existingPerson) {
    response
      .status(400)
      .json({ error: 'name must be unique' })
      .end();
    return;
  } else {
    const person = {
      id: generateId(),
      name: name,
      number: number,
    };

    persons = persons.concat(person);
    response.json(person);
    return
  }
});

const generateId = () => {
  const max = 1_000_000;
  const min = persons.length + 1;
  //min is 4 because there's already 4 people initially
  return String(Math.floor(Math.random() * (max - 4 + min)) + min);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});