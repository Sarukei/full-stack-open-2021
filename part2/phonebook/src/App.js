import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState(null);
  const personsToShow = !searchFilter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchFilter.toLowerCase())
      );

  useEffect(() => {
    phonebookService.getAllContacts().then((contacts) => setPersons(contacts));
  }, []);

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

    phonebookService
      .addContact(newPerson)
      .then((contact) => setPersons([...persons, contact]));

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
      <Filter setSearchFilter={setSearchFilter} searchFilter={searchFilter} />

      <h2>Add a new</h2>
      <PersonForm
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
