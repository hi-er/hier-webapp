import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Profile from './screens/profile';
import PostJob from './screens/postjob';
import Dashboard from './screens/dashboard';
import JobDetails from './screens/jobdetails';
import Login from './screens/login';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/profile" element={<Profile/>}/>
  
        <Route path="/postjob"element={<PostJob/>}/>
        <Route path="/dashboard"element={<Dashboard/>}/>
        <Route path="/jobdetails"element={<JobDetails/>}/>
        <Route path="/"element={<Login/>}/>
      </Routes>

  </Router>
  );
}

export default App;
