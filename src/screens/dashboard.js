import React, { useState, useEffect } from "react";
import "../App.css";
import JobCard from "../components/jobcard";
import { useNavigate } from "react-router-dom";
import {
  getCompanyDataByID,
  getOpportunitiesByCompany,
  getUserDataByID,
  logOut,
} from "../firebase/firebase";
function Dashboard() {
  const [openopportunities, setOpenOpportunities] = useState([]);
  const [closedopportunities, setClosedOpportunities] = useState([]);
  const [userName, setUserName] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  let navigate = useNavigate();
  function postJob() {
    navigate("/postjob");
  }
  function signout() {
    logOut();
    navigate("/");
  }
  useEffect(() => {
    let uuid = localStorage.getItem("isAuthenticated");
    getOpportunitiesByCompany().then((data) => {
      let open = [];
      let closed = [];
      data.forEach((element) => {
        if (element.closeJob) {
          closed.push(element);
        } else {
          open.push(element);
        }
      });
      setOpenOpportunities(open);
      setClosedOpportunities(closed);
    });
    getCompanyDataByID().then((data) => {
      setCompanyName(data.companyName);
    });
    getUserDataByID(uuid).then((data) => {
      setUserName(data.UserName);
    });
  }, []);

  function profile(params) {
    navigate("/profile");
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <img className="col-md-4 img" src="./assets/Logo.jpeg" />
          <span className="col-md-8 myJobsTxt">my jobs </span>
        </div>
        <div className="col-md-6 profileSection">
          <div className="float-right">
            <span className="myJobsTxt1 img">{userName}</span>
            <span onClick={profile} className="myJobsTxt1 img">
              {" "}
              | {companyName}
            </span>
            <span onClick={signout} className="myJobsTxt1 img">
              {" "}
              | signout
            </span>
          </div>
        </div>

        <a onClick={postJob} className="btn btn-block btn-login postJobBtn">
          post a job
        </a>

        <div className="row padding10">
          <div className="col-md-12 ">
            <h2 className="h2Txt1">
              connect with people intersted in your jobs
            </h2>
          </div>
        </div>
        <div className="row float-left">
          {openopportunities.map((item) => (
            <JobCard job={item} />
          ))}
        </div>
      </div>

      <div className="row padding10">
        <div className="col-md-12">
          <h2 className="h2Txt1">closed jobs</h2>
        </div>
      </div>
      <div className="row ">
        {closedopportunities.map((item) => (
          <JobCard job={item} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
