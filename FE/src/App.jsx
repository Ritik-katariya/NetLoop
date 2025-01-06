import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home/Home';
// import SignInForm from './components/Login/SignInForm';
// import PrivateOutlet from './components/Shared/PrivateOutlet';

import NotFound from './components/UI/NotFound';
import LoginPage from './components/Login/Login';
import OtpVerify from './components/Login/OtpVerify';
import SignUp from './components/Login/SignUp';
import ForgotPassword from './components/Login/ForgotPassword';
import UserCreate from './components/Login/UserCreate';
import Profile from './components/Profile/Profile';
import ProfileApp from './components/Profile/ProfileApp';
import ProfileDetailsForm from './components/Profile/EditProfileForm';
import VerifiedPage from './components/Verify/VerifiedPage';
import NetworkPage from './components/AddNetwork/NetworkPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<PrivateOutlet />}> */}
          
        {/* </Route> */}

        {/* <Route path='/login' element={<SignInForm />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verifyotp' element={<OtpVerify />} />
        <Route path='/create' element={<UserCreate />} />
        <Route path='/profile/:id?' element={<ProfileApp />} />
        <Route path='/verify/:id?' element={<VerifiedPage />} />
        <Route path='/profile/details-edit/:id?' element={<ProfileDetailsForm />} />
        <Route path='/add-network' element={<NetworkPage />} />
        {/* <Route path='/signup' element={<SignUp />} /> */}
       
        

        {/* protected route for doctor booking */}
        
         
          {/*  -- */}
      
       
        {/* Admin Dashboard  */}
        

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
