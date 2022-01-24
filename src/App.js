import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,

} from "react-router-dom";
import Profile from './screens/profile';
import PostJob from './screens/postjob';
import Dashboard from './screens/dashboard';
import JobDetails from './screens/jobdetails';
import Login from './screens/login';
import ForgotPassword from "./screens/forgotPassword";
import ProtectedRoute from './components/protectedRoute';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <Router>

      <Routes>
        <Route path="/profile" element={isAuthenticated?<Profile/>:<Login/>}/>
  
        <Route path="/postjob"element={<PostJob/>}/>
        <Route path="/dashboard"element={<Dashboard/>}/>
        <Route path="/jobdetails/:jobID"element={<JobDetails/>}/>
        <Route path="/"element={<Login/>}/>
        <Route path="/forgotpassword"element={<ForgotPassword/>}/>
      </Routes>

  </Router>
  );
}

export default App;
