import React from "react";

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Persons = ({ personsToShow }) => {
  return personsToShow.length
    ? personsToShow.map((person, i) => (
        <Person key={person.name} person={person} />
      ))
    : "...";
};

export default Persons;
