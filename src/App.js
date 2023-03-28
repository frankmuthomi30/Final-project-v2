import { Route, Routes } from "react-router-dom";
import Askingpage from "./Components/Askingpage";
import Homepage from "./Components/Homepage";
import Loginpage from "./Components/Loginpage";
import Profilepage from "./Components/Profilepage";
import Questionspage from "./Components/Questionspage";
import Signuppage from "./Components/Signuppage";
import Navbar from "./Components/Navbar";
import Answeringpage from "./Components/Answeringpage";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
               <Route path="/" element={<Loginpage/>}/> 
              <Route path="Homepage" element={<Homepage/>}/>
              <Route path="Signuppage" element={<Signuppage/>}/>
              <Route path="Questionspage" element={<Questionspage/>}/>
              <Route path="Askingpage" element={<Askingpage/>}/>
              <Route path="Profilepage" element={<Profilepage/>}/>
              <Route path="/Answeringpage/:questionId" element={<Answeringpage />} />
  
              
      </Routes>
    

    </div>
  );
}

export default App;
