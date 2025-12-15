const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>{person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons