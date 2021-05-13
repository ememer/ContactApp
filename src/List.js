import { useState } from "react";
import ListItem from "./ListItem";

const List = (props) => {
  const [checkedContact, setCheckedContact] = useState([]);

  // Func to taking choosed contact and fill array with id

  function getCheckedContact(checkedPersonId, check) {
    if (check) {
      setCheckedContact((prevState) => [...prevState, checkedPersonId]);
    } else if (!check) {
      setCheckedContact((prevState) =>
        prevState.filter((personId) => personId !== checkedPersonId)
      );
    }
  }

  //  isContactChecked checking for includes id in array every time when component is re-render

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
