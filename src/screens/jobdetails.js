import React, { useState, useEffect } from "react";
import "./dashboard.css";
import PreferencesButton from "../components/prefrencesButton";
import SkillButton from "../components/skillButton";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getOpportunityByID, acceptApplicant, rejectApplicant } from "../firebase/firebase";
import { faThumbsUp , faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import Loading from 'react-fullscreen-loading';
function JobDetails() {
  let navigate = useNavigate();
  let params = useParams();
  const [jobName, setJobName] = useState("");
  const [applicant, setApplicant] = useState({});
  const [opportunity, setOpportunity] = useState({});
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getOpportunityByID(params.jobID).then((data) => {
      console.log("this is the data: ", data.appliedUser[0]);
      setJobName(data.jobTitle);
      setApplicant(data.appliedUser[0]);
      setOpportunity(data);
      setLoading(false);
    });
  }, []);
  async function acceptthisApplicant() {
    setLoading(true)
  await  acceptApplicant(params.jobID, applicant?.id);
  await  getOpportunityByID(params.jobID).then((data) => {
      console.log("this is the data: ", data.appliedUser[0]);
      setJobName(data.jobTitle);
      setApplicant(data.appliedUser[0]);
      setOpportunity(data);
      setLoading(false);
    });
  }
 async function rejectthisApplicant() {
  setLoading(true)
  await  rejectApplicant(params.jobID, applicant?.id);
  await  getOpportunityByID(params.jobID).then((data) => {
      console.log("this is the data: ", data.appliedUser[0]);
      setJobName(data.jobTitle);
      setApplicant(data.appliedUser[0]);
      setOpportunity(data);
      setLoading(false);
    });
  }

  function home() {
    navigate("/dashboard");
  }
  return (
    <div>
        <Loading loading={loading} background="#2ecc71" loaderColor="#3498db" />
      <div className="row">
        <div className="col-md-12">
          <img
            onClick={home}
            className="col-md-4 img"
            src="../assets/Logo.jpeg"
          />

          <span className="col-md-8 myJobsTxt">{jobName}</span>
        </div>
      </div>

      <div className="row padding10">
        <div className="col-md-12">
          <h2 className="h2Txt1">applicants</h2>
        </div>
      </div>

      <div className="row">
     { applicant? <div className="col-md-10 jobDetailsContainer">
        <div className="col-md-10 jobDetailsInner">
          <div className="row">
            <div className="col-md-3 ">
              <div className="jobDetailsNameContainer">
                <b>{applicant?.firstName}{applicant?.lastName}</b>
              </div>
              <div className="jobDetailsContactContainer">
                <i className="fa fa-phone padding4"></i>
                <span>{applicant?.phoneNumber}</span>
                <br />
                <i className="fa fa-map-marker padding4"></i>
                <span>{applicant?.location}</span>
                <br />
                <i className="fa fa-envelope padding4"></i>
                <span>{applicant?.email}</span>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="preferencesText">
                <b>preferences</b>
              </div>
              <div className="fn16p10">
                <div className="row">
                  {applicant?.driving ? (
                    <PreferencesButton data="driving" />
                  ) : (
                    ""
                  )}
                  {applicant?.education ? (
                    <PreferencesButton data="education" />
                  ) : (
                    ""
                  )}
                  {applicant?.fullTime ? (
                    <PreferencesButton data="fullTime" />
                  ) : (
                    ""
                  )}
                  {applicant?.hospitality ? (
                    <PreferencesButton data="hospitality" />
                  ) : (
                    ""
                  )}
                  {applicant?.office ? <PreferencesButton data="office" /> : ""}
                  {applicant?.partTime ? (
                    <PreferencesButton data="partTime" />
                  ) : (
                    ""
                  )}
                  {applicant?.physical ? (
                    <PreferencesButton data="physical" />
                  ) : (
                    ""
                  )}
                  {applicant?.remote ? <PreferencesButton data="remote" /> : ""}
                  {applicant?.retail ? <PreferencesButton data="retail" /> : ""}
                  {applicant?.trade ? <PreferencesButton data="trade" /> : ""}
                </div>
              </div>

              <div className="skillsText">
                <b>skills</b>
              </div>
              <div className="fn16p10">
                <div className="row ">
                  {applicant?.skills?.map((item) => (
                    <SkillButton data={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-1">
              <div className="row thumbsUpContainer" onClick={acceptthisApplicant}>
                <div className="col-md-12 ">
                <FontAwesomeIcon icon={faThumbsUp} color="white" size="3x"/>
                </div>
              </div>
              <div className="row thumbsUpContainer bt1" onClick={rejectthisApplicant}>
                <div className="col-md-12">
                <FontAwesomeIcon icon={faThumbsUp} rotation={180} color="white" size="3x"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>:
       <div className="col-md-10 jobDetailsContainer">
         </div>}
      <div className="col-md-2">
        
        <div className="thumbsUpContainer1">
          
      <span className="fa-layers fa-fw">
      
    <FontAwesomeIcon icon={faFolderClosed} color="#0f3360" size="10x" />
   
    {/* <FontAwesomeIcon icon={faThumbsUp} inverse transform="shrink-8"  size="4x" title="2"/> */}
    <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-6 down-20">Accepted {opportunity?.accepted?.length}</span>
  </span>
  </div>

  <div className="thumbsUpContainer1">
  <span className="fa-layers fa-fw">
    <FontAwesomeIcon icon={faFolderClosed} color="#0f3360" size="10x"/>
    {/* <FontAwesomeIcon icon={faThumbsUp} inverse transform="shrink-6" rotation={180} size="4x" /> */}
    <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-4 down-20">Rejected {opportunity?.rejected?.length}</span>
  </span>
  </div>
      </div>
      
      </div>

    </div>
  );
}

export default JobDetails;
