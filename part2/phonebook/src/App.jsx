import { useState, useEffect } from "react";
import Persons from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import numberService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  //for adding new input
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    numberService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);

  const handleNameChange = (event) => {
    //sets the new name to the value of the input field
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    //sets the new name to the value of the input field
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const addPerson = (event) => {
    //when form is submitted the component reloads the page and takes new persons list to display
    event.preventDefault();
    //create new person object
    const newPerson = { name: newName, number: newNumber };
    //check for duplicate names
    if (persons.map((person) => person.name).includes(newName)) {
      alert(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      const personToUpdate = persons.find((p) => p.name === newName);
      const updatedPerson = { ...personToUpdate, number: newNumber };
      numberService
        .update(personToUpdate.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id === personToUpdate.id ? returnedPerson : p
            )
          );
          setNewName("");
          setNewNumber("");
        });
      return;
    }
    numberService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewNumber("");
      setNewName("");
    });
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (person) {
      alert(`Delete ${person.name}?`);
      numberService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
