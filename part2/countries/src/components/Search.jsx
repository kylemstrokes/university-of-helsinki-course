const Search = ({ placeholder, onChange }) => {
  return (
    <>
      <>
        Find countries 
        <input placeholder={placeholder} onChange={onChange} />
      </>
    </>
  );
};

export default Search;
