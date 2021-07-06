import React, { useState } from "react";
import "./App.css";
import Users from "./Components/Users";

function App(props) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUserDetails() {
    setIsLoading(true);
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const userDataAll = data.results.map((userData) => {
      return {
        title: userData.name.title,
        first: userData.name.first,
        last: userData.name.last,
        country: userData.location.country,
        email: userData.email,
        age: userData.dob.age,
        phone: userData.phone,
        photo: userData.picture.large,
        key: userData.id.value,
      };
    });
    setUser(userDataAll);
    setIsLoading(false);
  }

  return (
    <div>
      <div className="fetch">
        <button onClick={fetchUserDetails}>
          Click to find your next love!
        </button>
      </div>
      <div className="users-container">
        {!isLoading && user.length > 0 && <Users user={user} />}
        {isLoading && user.length === 0 && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
