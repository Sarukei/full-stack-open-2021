const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    `Please provide the password as an argument: node mongo.js <password>`
  );
  process.exit(1);
}

const person = {};

if (process.argv.length === 5) {
  person.name = process.argv[3];
  person.number = process.argv[4];
}

const password = process.argv[2];
const dbName = "phonebook-app";

const url = `mongodb+srv://admin-sarukei:${password}@cluster0.ulo8q.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (person.name && person.number) {
  const newPerson = new Person({ ...person });

  newPerson.save().then((result) => {
    console.log(result);
    console.log(`Added ${result.name} number ${result.number} to ph onebook`);

    mongoose.connection.close();
  });
} else {
  console.log("phonebook: ");
  Person.find({}).then((results) => {
    results.forEach((result) => {
      console.log(`${result.name} ${result.number}`);
    });

    mongoose.connection.close();
  });
}
