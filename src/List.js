import { useState } from "react";
import ListItem from "./ListItem";

const List = (props) => {
  const [checkedContact, setCheckedContact] = useState([]);

  function getCheckedContact(id, check) {
    if (check) {
      setCheckedContact((prevState) => [...prevState, id]);
    } else if (!check) {
      setCheckedContact((prevState) =>
        prevState.filter((person) => person !== id)
      );
    }
  }

  return (
    <ul className="container">
      {props.response.map((person) => (
        <ListItem
          isContactChecked={checkedContact.includes(person.id)}
          getCheckedBox={getCheckedContact}
          key={person.id}
          person={person}
        />
      ))}
    </ul>
  );
};

export default List;
