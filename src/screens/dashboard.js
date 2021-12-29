import React from "react";
import "./dashboard.css";
import JobCard from "../components/jobcard";
import { useNavigate } from 'react-router-dom';
function Dashboard () {
  let navigate = useNavigate();
   function postJob() {
    navigate("/postjob")
  }
function signout() {
  navigate("/")
}
function profile(params) {
  navigate("/profile")
}
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <img className="col-md-4 img" src="./assets/Logo.jpeg" />

            <span className="col-md-8 myJobsTxt">my jobs</span>
<span className="col-md-4 myJobsTxt img"> skylar gast</span>
<span onClick={profile} className="col-md-4 myJobsTxt img"> | rts</span>
<span onClick={signout} className="col-md-4 myJobsTxt img"> | signout</span>

          </div>

          <a onClick={postJob} className="btn btn-block btn-login postJobBtn">post a job</a>

          <div className="row padding10">
            <div className="col-md-12 ">
              <h2 className="h2Txt1">
                connect with people intersted in your jobs
              </h2>
            </div>
          </div>
          <JobCard />
        </div>

        <div className="row padding10">
          <div className="col-md-12">
          <h2 className="h2Txt1">closed jobs</h2>
          </div>
        </div>
        <JobCard />
      </div>
    );
  }


export default Dashboard;
