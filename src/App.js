import logo from './logo.svg';
import './App.css';
import Studentform from './Components/Studentform';
import Studentdata from './Components/Studentdata';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Updatestudent from './Components/Updatestudent';

function App() {
  return (
    <div>
       <>
    
      <Routes>
       
        <Route path="/Studentdata" element={<Studentdata />} />
        <Route path="/" element={<Studentform />} />
        <Route path="/Updatestudent/:name" element={<Updatestudent />} />
        
      </Routes>
      {/* </div> */}
    </>
     
    </div>
  );
}

export default App;
