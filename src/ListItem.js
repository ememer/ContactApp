import Avatar from "@material-ui/core/Avatar";
import { useEffect, useState } from "react";
import "./sass/ListItem.scss";

const ListItem = (props) => {
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [propsData, setPropsData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    checked: "",
  });

  useEffect(() => {
    const personPromise = new Promise((resolve, reject) => {
      if (props.person) {
        resolve(props.person);
      } else {
        reject(`Data can't loaded`);
      }
    });

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
          ></Avatar>
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
              <div className="col-11">Tutaj jeszcze nic nie ma</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListItem;
