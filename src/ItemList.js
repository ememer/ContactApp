import Avatar from "@material-ui/core/Avatar";
import { useEffect, useState } from "react";
import "./sass/ItemList.scss";

const ItemList = (props) => {
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

    const checkedPromise = new Promise((resolve, reject) => {
      if (props.isContactChecked) {
        resolve(props.isContactChecked);
      } else {
        console.log(props.isContactChecked);
        reject("Przesłane dane nie są obiektem");
      }
    });

    checkedPromise.then((data) => {
      const contact = data.map((contactId) => {
        return contactId.id;
      });

      if (contact.toString() === propsData.id.toString()) {
        // console.log("das", ...contact, propsData.id);
        setCheckBoxStatus(true);
      }
    });
  }, [props.person, checkBoxStatus, props.isContactChecked, propsData.id]);

  const handleToggleCheck = (e) => {
    console.log(e.target.id, propsData.id);
    setCheckBoxStatus((prevState) => !prevState);
    if (!checkBoxStatus) {
      props.get(e.target.id, true);
    } else {
      props.get(e.target.id, false);
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
          checked={checkBoxStatus}
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

export default ItemList;
