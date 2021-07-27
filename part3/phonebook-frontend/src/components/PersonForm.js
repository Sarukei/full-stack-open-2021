import React from "react";

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleNewPerson}>
      <div>
        name: <input onChange={props.handleNewName} value={props.newName} />
      </div>

      <div>
        number:{" "}
        <input onChange={props.handleNewNumber} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
