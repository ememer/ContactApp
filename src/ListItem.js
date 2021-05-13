import Avatar from "@material-ui/core/Avatar";
import { useEffect, useState } from "react";
import "./sass/ListItem.scss";

const ListItem = (props) => {
  const [checkBoxStatus, setCheckBoxStatus] = useState(props.isContactChecked);
  const [propsData, setPropsData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    checked: "",
  });

  useEffect(() => {
    // Promise waiting for data from API and fill user information to person object

    const personPromise = new Promise((resolve, reject) => {
      if (props.person) {
        resolve(props.person);
      } else {
        reject(`Data can't loaded`);
      }
    });

    // If format of data is correct filling state object with values

    personPromise.then((res) => {
      setPropsData({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        picture: res.picture,
        checked: res.check,
      });
    });
  }, [props.person, checkBoxStatus, props.isContactChecked, propsData.id]);

  // Handle toggling checbox and run getCheckedContact func via props
  // If checbox is set to false, give target id and set flag on true value or in case is true, give target id  and set flag on false value to control adding and removing toggled value in array at parent component (ListItem)

  const handleToggleCheck = (e) => {
    setCheckBoxStatus((prevState) => !prevState);
    if (!checkBoxStatus) {
      props.getCheckedBox(e.target.id, true);
    } else {
      props.getCheckedBox(e.target.id, false);
    }
  };

  return (
    <>
      <li className="row list">
        <div className="col-1 avatar">
          <Avatar
            alt={`${propsData.firstName} ${propsData.lastName}`}
            src={propsData.picture}
          >{`${propsData.firstName.slice(0, 1)}${propsData.lastName.slice(
            0,
            1
          )}`}</Avatar>
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col-12 person">
              {propsData.firstName} {propsData.lastName}
            </div>
          </div>
          <div className="row">
            <div className="col-12 email">{propsData.email}</div>
          </div>
        </div>
        <input
          onChange={handleToggleCheck}
          checked={props.isContactChecked}
          className="col-2 checkbox"
          type="checkbox"
          id={propsData.id}
        ></input>
      </li>
      {checkBoxStatus ? (
        <div className="row checkbox-content">
          <div className="col-12">
            <div className="row personal-data">
              <div className="col-11">Nothing to see there 🤷‍♂️</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListItem;
