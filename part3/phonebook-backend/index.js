require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);
app.use(cors());

app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  // res.json(persons);
  Person.find({}).then((people) => {
    res.json(people);
  });
});

const generateId = () => Math.floor(Math.random() * 12345);
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body || !body.name || !body.number) {
    return res.status(400).json({ error: `Name or number is missing` });
  }

  const existingPersonWithName = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (existingPersonWithName) {
    return res
      .status(400)
      .json({ error: `The name already exists in the phonebook` });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.get(`/api/persons/:id`, (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.status(404).end();
  }

  res.json(person);
});

app.delete(`/api/persons/:id`, (req, res) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id).then((result) => {
    res.status(204).end();
  });
});

app.get("/info", (req, res) => {
  const infoMsg = `
	<p>Phonebook has info for ${persons.length} people</p>

	<p>${new Date()}</p>
	`;
  res.send(infoMsg);
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
