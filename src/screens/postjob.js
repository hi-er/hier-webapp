import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { getSkillList, insertOpportunity } from "../firebase/firebase";

import Select from "react-select";

function PostJob() {
  useEffect(() => {
    getSkillList().then((data) => {
      let skillsArray = [];
      for (let index = 0; index < data.length; index++) {
        skillsArray.push({
          value: data[index],
          label: data[index]
        });
      }
      setSkills(skillsArray);
    });
  }, []);

  let navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [address, setAddress] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [skills, setSkills] = useState([]);
  const [closeDate, setCloseDate] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  function home() {
    navigate("/dashboard");
  }
  function _onFocus(e) {
    e.currentTarget.type = "date";
  }
  function _onBlur(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "close date";
  }

  function postJob() {
    if (
      insertOpportunity(
        jobTitle,
        address,
        maxSalary,
        selectedOption,
        closeDate,
        description,
        url
      )
    )
      navigate("/dashboard");
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <img
            onClick={home}
            className="col-md-4 img"
            src="./assets/Logo.jpeg"
          />

          <span className="col-md-8 myJobsTxt">post a job</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="simple-login-container">
            <div className="row p-2">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="form-control"
                  placeholder="job title"
                />
              </div>
            </div>
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
                <Select
                  isMulti={true}
                  onChange={setSelectedOption}
                  options={skills}
                  className="dropdown"                 
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

        <div className="col-md-6">
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
      </div>

      <input
        type="submit"
        onClick={postJob}
        className="btn btn-block btn-login submitButton"
        value="post"
      />
    </div>
  );
}

export default PostJob;
