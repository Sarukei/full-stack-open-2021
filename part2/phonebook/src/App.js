import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

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
    const existingPerson = personAlreadyExists(newName);
    const updatePhoneNumber =
      existingPerson &&
      window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
    if (existingPerson) {
      if (updatePhoneNumber) {
        phonebookService
          .updateContact(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotificationMessage(`Updated ${existingPerson.name}`);

            setTimeout(() => setNotificationMessage(null), 5000);
          });
      }
      setNewName("");
      setNewNumber("");

      return;
      // return alert(`${newName} already added to phonebook`);
    }
    // Add the new name to the phone list

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    phonebookService.addContact(newPerson).then((contact) => {
      setPersons([...persons, contact]);

      setNotificationMessage(`Added ${contact.name}`);

      setTimeout(() => setNotificationMessage(null), 5000);
    });
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

  const deleteContact = (id) => {
    const contact = persons.find((person) => person.id === id);

    console.log(contact);
    if (!window.confirm(`Delete ${contact.name}?`)) return;

    phonebookService.deleteContact(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
      <Persons personsToShow={personsToShow} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
