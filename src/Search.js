import { useState } from "react";

const Search = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleUpdateInput = (e) => {
    setInputValue(e.target.value);
    props.searchValue(e.target.value);
  };

  return (
    <form className="container">
      <div className="row search">
        <input
          type="text"
          placeholder="Type for serach"
          onChange={handleUpdateInput}
          value={inputValue}
          className="col-12 text-input"
        ></input>
      </div>
    </form>
  );
};

export default Search;
