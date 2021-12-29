import React, { useState, useEffect } from 'react';

import './login.css';
import Firebase from "../firebase/firebase";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   function tryLogin(){
       console.log(email);
       
   }
    return (
        <div>
        <div className="row">
        <div className="col-md-12">
          
                <img className="col-md-4 img" src="./assets/Logo.jpeg"/>
    
                
                <span className="col-md-8 span" >connecting people & jobs</span>
    
          
        </div>
    </div>
        <h2>employer login</h2>
    
    <div className="simple-login-container">
    
        <div className="row">
            <div className="col-md-12 form-group">
                <input type="text" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email address" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 form-group">
                <input type="password" value={password} placeholder="password" onChange={e=> setPassword(e.target.value)} className="form-control" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 form-group">
                <input type="submit" onClick={tryLogin} className="btn btn-block btn-login" value="login" />
            </div>
        </div>
        <div className="row textCenter">
            <div className="col-md-12">
                <a className='a' href=""><u>forgot password</u></a>
            </div>
            
        </div>
    </div>
    </div>
      );
}

export default Login;