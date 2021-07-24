import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new name to the phone list

    const newPerson = {
      name: newName,
    };
    setPersons([...persons, newPerson]);

    // Clear the new name value from the input
    setNewName("");
  };

  const handleChange = (e) => {
    const nameValue = e.target.value;

    setNewName(nameValue);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length
        ? persons.map((person, i) => <p key={person.name}>{person.name}</p>)
        : "..."}
    </div>
  );
};

export default App;
