import React from "react";
import "../screens/dashboard.css";
import { useNavigate } from 'react-router-dom';

function JobCard(props) {
const data= props.job;
console.log("Jobcard data",props);

  let navigate = useNavigate();
  function jobDetails() {
    navigate('/jobdetails/'+data.docID)
  }

    return (
      <div onClick={jobDetails}>
        <div className="row rowPadding1">
          <div className="col-md-2 heading1">
            <div className="headingColor">
              <b>{data.jobTitle}</b>
            </div>
            <div className="headingIcon">
              <i className="fa fa-users padding4"></i>
              <span>{data.appliedUser.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default JobCard;
