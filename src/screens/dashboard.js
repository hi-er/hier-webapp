import React from "react";
import "./dashboard.css";
import JobCard from "../components/jobcard";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <img className="col-md-4 img" src="./assets/Logo.jpeg" />

            <span className="col-md-8 myJobsTxt">my jobs</span>
          </div>

          <a className="btn btn-block btn-login postJobBtn">post a job</a>

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
}

export default Dashboard;
