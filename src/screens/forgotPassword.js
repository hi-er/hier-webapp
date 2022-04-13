import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../firebase/firebase";
import "./login.css";
// import Firebase from "../firebase/firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  function tryLogin() {
    try {
      forgotPassword(email);
    } catch (e) {
      alert(e);
    }
    //  navigate("/dashboard")
  }
  function back() {
    navigate("/");
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <img className="col-md-4 img" src="./assets/Logo.jpeg" />

          <span className="col-md-8 span">connecting people & jobs</span>
        </div>
      </div>
      <h2>Forgot Password</h2>

      <div className="simple-login-container">
        <div className="row">
          <div className="col-md-12 form-group">
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email address"
            />
          </div>
        </div>

        <div className="row textCenter">
          <div className="col-md-12 form-group">
            <input
              type="submit"
              onClick={tryLogin}
              className="btn btn-block btn-login"
              value="Send Link"
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              type="submit"
              onClick={back}
              className="btn btn-block btn-login"
              value="back"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
