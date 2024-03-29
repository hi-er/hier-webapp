import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {
  getCompanyDataByID,
  updateCompany,
  uploadFile,
} from "../firebase/firebase";
function Profile() {
  let navigate = useNavigate();
  useEffect(() => {
    console.log(fileURL);
    getCompanyDataByID().then((data) => {
      setCompanyName(data.companyName);
      setURL(data.url);
    });
  }, []);
  const [companyName, setCompanyName] = useState("");
  const [url, setURL] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [firebaseFileUrl, setFirebaseFileUrl] = useState("");
  function home() {
    navigate("/dashboard");
  }
  function update() {
    updateCompany(companyName, url, firebaseFileUrl);
    navigate("/dashboard");
  }
  async function upload() {
   
    const file = await uploadFile(selectedFile);
    setFileURL(file);
    setFirebaseFileUrl("images/" + selectedFile.name);
    console.log("this is file: ", firebaseFileUrl);
    updateCompany(companyName, url, "images/" + selectedFile.name);
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

          <span className="col-md-8 span">company profile</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="simple-login-container">
            <div className="row">
              <div className="col-md-12 form-group">
                <label>company name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="form-control fontFamily1"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group">
                <label>url</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  className="form-control fontFamily1"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group">
                <input
                  onClick={update}
                  type="submit"
                  className="btn btn-block btn-login"
                  value="update"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="simple-login-container textCenter">
            <input
              accept="image/*"
              type="file"
              defaultValue={selectedFile}
              onChange={(e) => {
                console.log(e.target.files[0]);
                setSelectedFile(e.target.files[0]);
              }}
              id="imgInp"
            />
            <img id="blah" src={fileURL} className="blahImage1" />
            <input
              onClick={upload}
              type="submit"
              className="btn btn-block btn-login"
              value="upload"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
