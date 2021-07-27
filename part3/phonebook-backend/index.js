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
  const id = req.params.id;

  Person.findById(id)
    .then((foundPerson) => {
      if (foundPerson) {
        res.json(foundPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete(`/api/persons/:id`, (req, res) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id).then((result) => {
    res.status(204).end();
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  Person.findByIdAndUpdate(
    id,
    { name: body.name, number: body.number },
    { new: true }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const infoMsg = `
		<p>Phonebook has info for ${count} people</p>
	
		<p>${new Date()}</p>
		`;
      res.send(infoMsg);
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
