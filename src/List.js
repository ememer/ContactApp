import ItemList from "./ItemList";

const List = (props) => {
  return (
    <ul className="container">
      {props.response.map((person) => (
        <ItemList key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default List;
