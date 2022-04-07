import React from "react";
import "../screens/dashboard.css";
import { useNavigate } from 'react-router-dom';

function JobCard(props) {
const data= props.job;


  let navigate = useNavigate();
  function jobDetails() {
    navigate("/jobDetails/"+data.docID);
  }

    return (
     
          <div className="col-md-2 heading1" onClick={jobDetails}>
            <div className="headingColor">
              <b>{data.jobTitle}</b>
            </div>
            <div className="headingIcon">
              <i className="fa fa-users padding4"></i>
              <span>{data.appliedUser.length + (data?.accepted?.length ? data?.accepted.length:0 )+ (data?.rejected?.length ? data?.rejected.length:0 )}</span>
            </div>
          </div>
        
    );
  }


export default JobCard;
