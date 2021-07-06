import "./Users.css";
import User from "./User";

const Users = (props) => {
  return (
    <ul>
      {props.user.map((user) => (
        <User 
        title={user.title} 
        first={user.first} 
        last={user.last} 
        country={user.country}
      email={user.email}
      age={user.age}
      phone={user.phone}
      photo={user.photo}
      key={user.key}
        
        />
      ))}
    </ul>
  );
};

export default Users;
