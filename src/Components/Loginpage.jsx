import {  useState   } from "react";
import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import './Loginpage.css';
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const addData = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        alert("Logged in successfully!");
        // Redirect to the home page or some other page
        navigate("/Homepage"); // Redirect to the home page
      })
      .catch((error) => {
        alert(error.message); // Show the error message in an alert
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

      <button onClick={addData}>Log In</button>
    </div>
  );
}

export default Loginpage;
