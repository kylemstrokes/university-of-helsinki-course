const PersonForm = ({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        {/* on render the input value is blank or the newName
            when the submit button is clicked the handleNameChange function is called
          */}
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
