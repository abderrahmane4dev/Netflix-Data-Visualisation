import logo from './logo.svg';
import './App.css';
import Duration from './components/Duration/Duration';
import Navbar from './components/Navbar/Navbar';
import Country from './components/Country/Country';
import Page1 from './pages/index1' ;
import Page3 from './pages/index3';
import Page4 from './pages/index4';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Page2 from './pages/index2';



function App() {
  return (
   
      <BrowserRouter>
      <Routes>
      <Route path="" element={<Page1 />} />  
      <Route path="/G2" element={<Page2 />} />
      <Route path="/G3" element={<Page3 />} />
      <Route path="/G4" element={<Page4 />} />
     
      </Routes> 
      </BrowserRouter>
      
   
  );
}

export default App;
