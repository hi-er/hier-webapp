import React from "react";
import "../screens/dashboard.css";
import { useNavigate } from 'react-router-dom';

function JobCard() {
  let navigate = useNavigate();
  function jobDetails() {
    navigate('/jobdetails')
  }

    return (
      <div onClick={jobDetails}>
        <div className="row rowPadding1">
          <div className="col-md-2 heading1">
            <div className="headingColor">
              <b>swim instructor</b>
            </div>
            <div className="headingIcon">
              <i className="fa fa-users padding4"></i>
              <span>2</span>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default JobCard;
