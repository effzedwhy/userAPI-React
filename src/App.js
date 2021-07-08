import React, { useState } from "react";
import "./App.css";
import Users from "./Components/Users";

function App(props) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [gender, setGender] = useState("");
  const [url, setUrl] = useState("https://randomuser.me/api/");

  const handleChange = (e) => {
    if (e.target.value === "Female") {
      setUrl("https://randomuser.me/api/?gender=female");
    } else if (e.target.value === "Male") {
      setUrl("https://randomuser.me/api/?gender=male");
    } else return url;
  };

  async function fetchUserDetails(e) {
    setIsLoading(true);
    setError(null);
    e.preventDefault();
    setUrl(setUrl);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error retrieving results");
      }
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
          gender: userData.gender,
        };
      });
      setUser(userDataAll);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }
  let handleText = <Users user={user} />;

  if (isLoading && !error) {
    handleText = <p>Loading...</p>;
  }

  if (error || user.length === 0) {
    handleText = <p>No results</p>;
  }

  return (
    <div>
      <div className="fetch">
        <form onSubmit={fetchUserDetails}>
          <select onChange={handleChange} defaultValue="">
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <button>Click to find your next love!</button>
        </form>
      </div>
      <div className="users-container">{handleText}</div>
    </div>
  );
}

export default App;
