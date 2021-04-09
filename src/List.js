import { useState } from "react";
import ItemList from "./ItemList";

const List = (props) => {
  const [checkedContact, setCheckedContact] = useState("");

  function getCheckedContact(id, check) {
    if (check) {
      setCheckedContact((prevState) => [
        ...prevState,
        { id: id, check: check },
      ]);
    } else if (!check) {
      setCheckedContact((prevState) =>
        prevState.filter((person) => person.id !== id && person.check !== check)
      );
    }
  }

  return (
    <ul className="container">
      {props.response.map((person) => (
        <ItemList
          isContactChecked={checkedContact}
          get={getCheckedContact}
          key={person.id}
          person={person}
        />
      ))}
    </ul>
  );
};

export default List;
