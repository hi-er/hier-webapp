import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import JobCard from "../components/jobcard";
import { useNavigate } from 'react-router-dom';
import {getOpportunitiesByCompany, logOut} from '../firebase/firebase';
function Dashboard () {
  const[openopportunities, setOpenOpportunities]= useState([]);
  const[closedopportunities, setClosedOpportunities]= useState([]);
  let navigate = useNavigate();
   function postJob() {
    navigate("/postjob")
  }
function signout() {
  logOut();
  navigate("/")
}
useEffect(()=>{
 getOpportunitiesByCompany().then(data=>
  {
    console.log(data);
    let open=[];
let closed=[];
     data.forEach(element => {
       var today= new Date();
       var closeDate= new Date(element.closeDate);
       if(today>closeDate)
       {
         closed.push(element);
       }
       else{
         open.push(element);
       }
     });
     setOpenOpportunities(open);
     setClosedOpportunities(closed);
  })

}, [])

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
          {
            openopportunities.map(item=>
              <JobCard job={item} />
              )
          
          }
        </div>

        <div className="row padding10">
          <div className="col-md-12">
          <h2 className="h2Txt1">closed jobs</h2>
          </div>
        </div>
        {
            closedopportunities.map(item=>
              <JobCard job={item} />
              )
          
          }
      </div>
    );
  }


export default Dashboard;
