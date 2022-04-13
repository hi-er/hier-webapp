import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import Profile from './screens/profile';
import PostJob from './screens/postjob';
import Dashboard from './screens/dashboard';
import JobDetails from './screens/jobdetails';
import Login from './screens/login';
import ForgotPassword from "./screens/forgotPassword";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <Router>

      <Routes>
        {isAuthenticated &&(<>
        <Route path="/profile" element={isAuthenticated?<Profile/>:<Login/>}/>
  
        <Route path="/postjob"element={<PostJob/>}/>
        <Route path="/dashboard"element={<Dashboard/>}/>
        <Route path="/jobdetails/:jobID"element={<JobDetails/>}/>
       
        <Route path="/forgotpassword"element={<ForgotPassword/>}/>
        </>
        )}
        <Route path="/login"element={<Login/>}/>
        <Route path="*"element={<Navigate to={'/login'}/>}/>
      </Routes>

  </Router>
  );
}

export default App;
