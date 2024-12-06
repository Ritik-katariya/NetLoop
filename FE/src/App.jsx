import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home/Home';
// import SignInForm from './components/Login/SignInForm';
// import PrivateOutlet from './components/Shared/PrivateOutlet';

import NotFound from './components/UI/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<PrivateOutlet />}> */}
          
        {/* </Route> */}

        {/* <Route path='/login' element={<SignInForm />} /> */}
        <Route path='/' element={<Home />} />
        

        {/* protected route for doctor booking */}
        
         
          {/*  -- */}
      
       
        {/* Admin Dashboard  */}
        

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
