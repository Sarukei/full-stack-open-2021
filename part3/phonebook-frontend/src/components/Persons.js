import React from "react";

const Person = ({ person, deleteContact }) => (
  <p>
    {person.name} {person.number}{" "}
    <button onClick={deleteContact}>delete</button>
  </p>
);

const Persons = ({ personsToShow, deleteContact }) => {
  return personsToShow.length
    ? personsToShow.map((person, i) => (
        <Person
          key={person.name}
          person={person}
          deleteContact={() => deleteContact(person.id)}
        />
      ))
    : "...";
};

export default Persons;
