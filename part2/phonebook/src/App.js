import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    // { name: "Ada Lovelace", number: "39-44-5323523" },
    // { name: "Dan Abramov", number: "12-43-234345" },
    // { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const personAlreadyExists = (name) =>
    persons.find((person) => person.name === name);

  const handleNewPerson = (e) => {
    e.preventDefault();

    // Check if person already exists
    if (personAlreadyExists(newName)) {
      return alert(`${newName} already added to phonebook`);
    }

    // Add the new name to the phone list

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons([...persons, newPerson]);

    // Clear the new name value from the input
    setNewName("");
    // Clear the number value from the input
    setNewNumber("");
  };

  const handleNewName = (e) => {
    const nameValue = e.target.value;

    setNewName(nameValue);
  };

  const handleNewNumber = (e) => {
    const numberValue = e.target.value;
    setNewNumber(numberValue);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input onChange={handleNewName} value={newName} />
        </div>

        <div>
          number: <input onChange={handleNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length
        ? persons.map((person, i) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : "..."}
    </div>
  );
};

export default App;
