import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home/Home';
// import SignInForm from './components/Login/SignInForm';
// import PrivateOutlet from './components/Shared/PrivateOutlet';

import NotFound from './components/UI/NotFound';
import LoginPage from './components/Login/Login';
import OtpVerify from './components/Login/OtpVerify';
import UserCreate from './components/Login/UserCreate';
import ProfileApp from './components/Profile/ProfileApp';
import ProfileDetailsForm from './components/Profile/EditProfileForm';
import VerifiedPage from './components/Verify/VerifiedPage';
import NetworkPage from './components/AddNetwork/NetworkPage';
import Network from './components/Network/Network';
import NetworkProfile from './components/Network/NetworkProfile';
import MessagePage from './components/Message/MessagePage';
import Explore from './components/Explore/Explore';
import CreateExpo from './components/Explore/CreateExpo';
import StoryPage from './components/Story/StoryPage';

function App() {
  return (
    <Router >
      <Routes>
        {/* <Route element={<PrivateOutlet />}> */}
          
        {/* </Route> */}

        {/* <Route path='/login' element={<SignInForm />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verifyotp' element={<OtpVerify />} />
        <Route path='/create' element={<UserCreate />} />
        <Route path='/:name/:id?' element={<ProfileApp />} />
        <Route path='/verify/:id?' element={<VerifiedPage />} />
        <Route path='/profile/details-edit/:id?' element={<ProfileDetailsForm />} />
        <Route path='/add-network' element={<NetworkPage />} />
        <Route path='/network' element={<Network />} />
        <Route path='/network/:id?' element={<NetworkProfile />} />
        <Route path='/message' element={<MessagePage />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/create-explore/:id' element={<CreateExpo />} />
        <Route path='/story/:id' element={<StoryPage />} />
        {/* <Route path='/story' element={<StoryPage />} /> */}
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
