import { useEffect, useState } from "react";
import NavBarr from "./NavBarr";
import "./sass/App.scss";
import Search from "./Search";
import List from "./List";

function App() {
  const [response, setResponse] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("https://dummyapi.io/data/api/user?limit=100", {
      method: "GET",
      headers: {
        "app-id": "604f2259ecc19e241b001376",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setResponse(
          response.data.map((apiData) => {
            return { ...apiData, check: false };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filterContacts = (userInput) => {
    return response.filter(
      (person) =>
        person.firstName.toLowerCase().includes(userInput.toLowerCase()) ||
        person.lastName.toLowerCase().includes(userInput.toLowerCase())
    );
  };

  return (
    <div className="App">
      <NavBarr />
      <Search searchValue={setSearchValue} />
      <List response={filterContacts(searchValue)} />
    </div>
  );
}

export default App;
