import {  useState } from "react";
import { app } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

function Signuppage() {
  const auth = getAuth();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // initialize useHistory hook

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const addData = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        alert("Account created successfully!");
        navigate("/Loginpage"); // redirect to login page after account creation
      })
      .catch((error) => {
        // Handle errors here
        console.log(error);
      });
  };

  return (
    <div className="App-header">
      <input
        placeholder="Email"
        name="email"
        type="email"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />

      <button onClick={addData}>Create Account</button>
    </div>
  );
}

export default Signuppage;
