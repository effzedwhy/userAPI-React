import React from "react";
import "./User.css";

const User = ({ title, first, last, country, email, age, phone, photo }) => {
  return (
    <li>
      <h2>
        {title}&nbsp;{first}&nbsp;{last}
      </h2>
      <div className="all-info">
        <div className="photo">
          <img src={photo} alt="user"></img>
        </div>
        <div className="info">
          <p>
            <span>Age:</span> {age}
          </p>
          <p>
            <span>Country:</span> {country}
          </p>
          <p>
            <span>Email:</span> {email}
          </p>
          <p>
            <span>Phone Number:</span> {phone}
          </p>
        </div>
      </div>
    </li>
  );
};

export default User;
