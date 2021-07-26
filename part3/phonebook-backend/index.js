const express = require("express");

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
const PORT = 3001;

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const generateId = () => Math.floor(Math.random() * 12345);
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body || !body.name)
    return res.status(400).json({ error: `Cannot post empty person` });

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, newPerson];

  res.json(newPerson);
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
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.status(204).end();
  }

  persons = persons.filter((person) => person.id !== id);

  return res.status(204).end();
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
