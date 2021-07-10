import React, { useState } from "react";
import "./App.css";
import Users from "./Components/Users";
import Header from "./Components/Layout/Header";

function App(props) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("https://randomuser.me/api/");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [matchText, setMatchText] = useState(null);
  const [gender, setGender] = useState(null);

  const handleChange = (e) => {
    if (e.target.value === "Female") {
      setUrl("https://randomuser.me/api/?gender=female");
      setGender("female");
    } else if (e.target.value === "Male") {
      setUrl("https://randomuser.me/api/?gender=male");
      setGender("male");
    } else return url;
  };

  async function fetchUserDetails(e) {
    setIsLoading(true);
    setError(null);
    if (e) {
      e.preventDefault();
      setMatchText(null);
    }
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

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      fetchUserDetails();
      setMatchText(null);
      //left
    }

    if (touchStart - touchEnd < -150) {
      setMatchText("Great, you found your match!");
      //right
    }
  };

  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (touchStart - touchEnd > 100) {
      console.log("left");
      fetchUserDetails();
      setMatchText(null);
      //left
    }
    if (touchStart - touchEnd < -100) {
      setMatchText("Great, you found your match!");
      console.log("right");
      //right
    }
  };

  let genderColor = "users-container";
  switch (gender) {
    case "male":
      genderColor += " blue";
      break;
    case "female":
      genderColor += " pink";
      break;
    default:
      genderColor = "users-container";
  }

  return (
    <div>
      <Header />
      <div className="summary-text">
        <h2>Find your soulmate today.</h2>
        <p>If you like a profile swipe right and if you don't swipe left to see more.</p>
      </div>
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

      <div
        className={genderColor}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <h3>{matchText}</h3>
        {handleText}
      </div>
    </div>
  );
}

export default App;
