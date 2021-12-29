import React from "react";
import "./dashboard.css";
import PreferencesButton from "../components/prefrencesButton";
import SkillButton from "../components/skillButton";
import { useNavigate } from 'react-router-dom';
function JobDetails() {
  let navigate = useNavigate();
  function home() {
    navigate('/dashboard');
}
    return (
    <div>
    <div className="row">
    <div className="col-md-12">
      
    <img onClick={home} className="col-md-4 img" src="./assets/Logo.jpeg" />

            
            <span className="col-md-8 myJobsTxt">
                swim instructor</span>

      
    </div>
</div>


  <div className="row padding10">
      <div className="col-md-12">
          <h2 className="h2Txt1">applicants</h2>
      </div>
  </div>
  <div className="row jobDetailsContainer">
    <div className="col-md-8 jobDetailsInner" >
           <div className="row">
           <div className="col-md-3 ">
                <div className="jobDetailsNameContainer"> 
                    <b>swim instructor</b>
             </div>
             <div className="jobDetailsContactContainer">
                <i className="fa fa-phone padding4"  ></i>
                <span>041 555 5555</span>
                <br/>
                <i className="fa fa-map-marker padding4"  ></i>
                <span>3220</span>
                <br/>
                <i className="fa fa-envelope padding4"  ></i>
                <span>bh@gmail.com</span>
                <br/>
                

            </div>
            </div>
            <div className="col-md-8">
                <div className="preferencesText"> 
                    <b>preferences</b>
             </div>
             <div className="fn16p10">
              <div className="row">
                  <div  className="col-md-2 preferencesButton">
                        full time
                  </div>
                  <div  className="col-md-2 preferencesButton">
                    full time
              </div>
              
              <div  className="col-md-2 preferencesButton">
                full time
          </div>
          
          <div  className="col-md-2 preferencesButton">
            full time
      </div>
      
      <div  className="col-md-2 preferencesButton">
        full time
  </div>
<PreferencesButton/>
  
              </div>
            </div>


            <div className="skillsText"> 
                <b>skills</b>
         </div>
         <div className="fn16p10">
          <div className="row ">
           <SkillButton/>
        
              <div className="col-md-5 skillsButton">
                full time
          </div>
          <div className="col-md-5 skillsButton">
            full time
      </div>

      <div className="col-md-5 skillsButton">
        full time
  </div>


          </div>
        </div>
            </div>
            <div className="col-md-1">
                <div className="row thumbsUpContainer" >
                    <div className="col-md-12" >
                    </div>
                </div>
                <div className="row thumbsUpContainer bt1">
                    <div className="col-md-12" >
                    </div>
                </div>
            </div>
        </div>
        
      
    </div>
  

   
</div>
      

 


 
</div>
    
        
     
        );
  }


export default JobDetails;
