import React, { useState, useEffect } from "react";
import "../App.css";
import PreferencesButton from "../components/prefrencesButton";
import SkillButton from "../components/skillButton";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getOpportunityByID,
  acceptApplicant,
  rejectApplicant,
  updateOpportunity
} from "../firebase/firebase";
import { faThumbsUp, faFolderClosed } from "@fortawesome/free-solid-svg-icons";
import Loading from "react-fullscreen-loading";
function JobDetails() {
  let navigate = useNavigate();
  let params = useParams();
  const [jobName, setJobName] = useState("");
  const [applicant, setApplicant] = useState({});
  const [opportunity, setOpportunity] = useState({});
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);


  const [address, setAddress] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [closeJob, setCloseJob] = useState(false);
  const [closeDate, setCloseDate] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");


  useEffect(() => {
    getOpportunityByID(params.jobID).then((data) => {
      setJobName(data.jobTitle);
      setApplicant(data.appliedUser[0]);
      setOpportunity(data);
      
      setAccepted(data.acceptedUser);
      setRejected(data.rejectedUser);
      setAddress(data.address);
      setMaxSalary(data.maxSalary);
      setCloseDate(data.closeDate);
      setUrl(data.url);
      setDescription(data.longDescription);
      setLoading(false);
      console.log(accepted);
    });
  }, []);
  async function acceptthisApplicant() {
    setLoading(true);
    await acceptApplicant(params.jobID, applicant?.id);
    await getOpportunityByID(params.jobID).then((data) => {
      setJobName(data.jobTitle);
      setApplicant(data.appliedUser[0]);
      setOpportunity(data);
      setLoading(false);
    });
  }
  function showAcceptedUsers(value) {

    setShowAccepted(!showAccepted);
  }
  function showRejectedUsers(value) {
    setShowRejected(!showRejected);
  }
  async function rejectthisApplicant() {
    setLoading(true);
    await rejectApplicant(params.jobID, applicant?.id);
    await getOpportunityByID(params.jobID).then((data) => {
      setJobName(data.jobTitle);
      setApplicant(data.appliedUser[0]);
      setOpportunity(data);
      setLoading(false);
    });
  }
  function _onFocus(e) {
    e.currentTarget.type = "date";
  }
  function _onBlur(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "close date";
  }
  function updateJob() {
    setLoading(true);
    if (
      updateOpportunity(
        params.jobID,
        address,
        maxSalary,
        closeDate,
        description,
        url,
        false
      )
    )
    {
      setLoading(false);
alert("job updated ");
    }
    else
    {
      setLoading(false);
      alert("there was a problem in your request");
    }

  }
  function closeCurrentJob() {
    setLoading(true);
    if (
      updateOpportunity(
        params.jobID,
        address,
        maxSalary,
        closeDate,
        description,
        url,
        true
      )
    )
    {
      setLoading(false);
      alert("job closed");
    }
    else
    {
      setLoading(false);
      alert("there was a problem in your request");
    }

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
        <div className="col-md-4">
          <div className="simple-login-container">
            
            <div className="row p-2">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="job location (postal code)"
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="form-control"
                  placeholder="maximum salary or hourly rate"
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  value={closeDate}
                  onFocus={_onFocus}
                  onBlur={_onBlur}
                  onChange={(e) => setCloseDate(e.target.value)}
                  className="form-control"
                  placeholder="close date"
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-12 form-group">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="form-control"
                  placeholder="link to job"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="simple-login-container">
            <div className="row p-2">
              <div className="col-md-12 form-group">
                <textarea
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="job description"
                  className="form-control"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      <div className="col-md-2">
      <div className="simple-login-container">
      <input
        type="submit"
        onClick={updateJob}
        className="btn btn-block btn-login submitButton"
        value="update job"
      />
        <input
        type="submit"
        onClick={closeCurrentJob}
        className="btn btn-block btn-login submitButton"
        value="close job"
      />
      </div>
      </div>
      </div>


      <div className="row">
        {applicant ? (
          <div className="col-md-10 jobDetailsContainer">
            <div className="col-md-10 jobDetailsInner">
              <div className="row">
                <div className="col-md-3 ">
                  <div className="jobDetailsNameContainer">
                    <b>
                      {applicant?.firstName}
                      {applicant?.lastName}
                    </b>
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
                      {applicant?.office ? (
                        <PreferencesButton data="office" />
                      ) : (
                        ""
                      )}
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
                      {applicant?.remote ? (
                        <PreferencesButton data="remote" />
                      ) : (
                        ""
                      )}
                      {applicant?.retail ? (
                        <PreferencesButton data="retail" />
                      ) : (
                        ""
                      )}
                      {applicant?.trade ? (
                        <PreferencesButton data="trade" />
                      ) : (
                        ""
                      )}
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
                  <div
                    className="row thumbsUpContainer"
                    onClick={acceptthisApplicant}
                  >
                    <div className="col-md-12 ">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        color="white"
                        size="3x"
                      />
                    </div>
                  </div>
                  <div
                    className="row thumbsUpContainer bt1"
                    onClick={rejectthisApplicant}
                  >
                    <div className="col-md-12">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        rotation={180}
                        color="white"
                        size="3x"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-md-10 jobDetailsContainer"></div>
        )}

       
        <div className="col-md-2" >
          <div className="thumbsUpContainer1" onClick={showAcceptedUsers}>
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon
                icon={faFolderClosed}
                color="#0f3360"
                size="10x"
              />

              {/* <FontAwesomeIcon icon={faThumbsUp} inverse transform="shrink-8"  size="4x" title="2"/> */}
              <span
                className="fa-layers-text fa-inverse"
                data-fa-transform="shrink-6 down-20"
              >
                Accepted {opportunity?.accepted?.length}
              </span>
            </span>
          </div>

          <div className="thumbsUpContainer1" onClick={showRejectedUsers}>
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon
                icon={faFolderClosed}
                color="#0f3360"
                size="10x"
              />
              {/* <FontAwesomeIcon icon={faThumbsUp} inverse transform="shrink-6" rotation={180} size="4x" /> */}
              <span
                className="fa-layers-text fa-inverse"
                data-fa-transform="shrink-4 down-20"
              >
                Rejected {opportunity?.rejected?.length}
              </span>
            </span>
          </div>
        </div>
      </div>
      {showAccepted &&
      <div className="row padding10">
        <div className="col-md-12">
          <h2 className="h2Txt1"> accepted applicants</h2>
        </div>
      </div>
}

{showAccepted &&accepted.map(function(data){ return(
        <div className="row">
          <div className="col-md-10 jobDetailsContainer">
            <div className="col-md-10 jobDetailsInner">
              <div className="row">
                <div className="col-md-3 ">
                  <div className="jobDetailsNameContainer">
                    <b>
                      {accepted?.firstName}
                      {data?.lastName}
                    </b>
                  </div>
                  <div className="jobDetailsContactContainer">
                    <i className="fa fa-phone padding4"></i>
                    <span>{data?.phoneNumber}</span>
                    <br />
                    <i className="fa fa-map-marker padding4"></i>
                    <span>{data?.location}</span>
                    <br />
                    <i className="fa fa-envelope padding4"></i>
                    <span>{data?.email}</span>
                    <br />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="preferencesText">
                    <b>preferences</b>
                  </div>
                  <div className="fn16p10">
                    <div className="row">
                      {data?.driving ? (
                        <PreferencesButton data="driving" />
                      ) : (
                        ""
                      )}
                      {data?.education ? (
                        <PreferencesButton data="education" />
                      ) : (
                        ""
                      )}
                      {data?.fullTime ? (
                        <PreferencesButton data="fullTime" />
                      ) : (
                        ""
                      )}
                      {data?.hospitality ? (
                        <PreferencesButton data="hospitality" />
                      ) : (
                        ""
                      )}
                      {data?.office ? <PreferencesButton data="office" /> : ""}
                      {data?.partTime ? (
                        <PreferencesButton data="partTime" />
                      ) : (
                        ""
                      )}
                      {data?.physical ? (
                        <PreferencesButton data="physical" />
                      ) : (
                        ""
                      )}
                      {data?.remote ? <PreferencesButton data="remote" /> : ""}
                      {data?.retail ? <PreferencesButton data="retail" /> : ""}
                      {data?.trade ? <PreferencesButton data="trade" /> : ""}
                    </div>
                  </div>

                  <div className="skillsText">
                    <b>skills</b>
                  </div>
                  <div className="fn16p10">
                    <div className="row ">
                      {data?.skills?.map((item) => (
                        <SkillButton data={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )
      })}
    
    {showRejected &&
      <div className="row padding10">
        <div className="col-md-12">
          <h2 className="h2Txt1">rejected applicants</h2>
        </div>
      </div>
}

{showRejected &&rejected.map(function(data){
          return(
            <div className="row">
            <div className="col-md-10 jobDetailsContainer">
              <div className="col-md-10 jobDetailsInner">
                <div className="row">
                  <div className="col-md-3 ">
                    <div className="jobDetailsNameContainer">
                      <b>
                        {accepted?.firstName}
                        {data?.lastName}
                      </b>
                    </div>
                    <div className="jobDetailsContactContainer">
                      <i className="fa fa-phone padding4"></i>
                      <span>{data?.phoneNumber}</span>
                      <br />
                      <i className="fa fa-map-marker padding4"></i>
                      <span>{data?.location}</span>
                      <br />
                      <i className="fa fa-envelope padding4"></i>
                      <span>{data?.email}</span>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="preferencesText">
                      <b>preferences</b>
                    </div>
                    <div className="fn16p10">
                      <div className="row">
                        {data?.driving ? (
                          <PreferencesButton data="driving" />
                        ) : (
                          ""
                        )}
                        {data?.education ? (
                          <PreferencesButton data="education" />
                        ) : (
                          ""
                        )}
                        {data?.fullTime ? (
                          <PreferencesButton data="fullTime" />
                        ) : (
                          ""
                        )}
                        {data?.hospitality ? (
                          <PreferencesButton data="hospitality" />
                        ) : (
                          ""
                        )}
                        {data?.office ? <PreferencesButton data="office" /> : ""}
                        {data?.partTime ? (
                          <PreferencesButton data="partTime" />
                        ) : (
                          ""
                        )}
                        {data?.physical ? (
                          <PreferencesButton data="physical" />
                        ) : (
                          ""
                        )}
                        {data?.remote ? <PreferencesButton data="remote" /> : ""}
                        {data?.retail ? <PreferencesButton data="retail" /> : ""}
                        {data?.trade ? <PreferencesButton data="trade" /> : ""}
                      </div>
                    </div>
  
                    <div className="skillsText">
                      <b>skills</b>
                    </div>
                    <div className="fn16p10">
                      <div className="row ">
                        {data?.skills?.map((item) => (
                          <SkillButton data={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
          )
        }
        )}
      </div>

  );
}

export default JobDetails;
