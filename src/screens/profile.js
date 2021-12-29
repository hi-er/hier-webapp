import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
function Profile () {
    let navigate = useNavigate();
    function home() {
        navigate('/dashboard');
    }
    function update() {
        navigate('/dashboard');
    }

        return( 
        <div>
        <div  className="row">
        <div  className="col-md-12">
          
        <img onClick={home} className="col-md-4 img" src="./assets/Logo.jpeg" />
    
                
                <span  className="col-md-8 span">
                    company profile</span>
    
          
        </div>
    </div>
    
        <div  className="row">
            <div  className="col-md-6">
                
    <div  className="simple-login-container">
    
        <div  className="row">
            <div  className="col-md-12 form-group">
                <label>company name</label>
                <input type="text"  className="form-control fontFamily1" />
            </div>
        </div>
        <div  className="row">
            <div  className="col-md-12 form-group">
                <label>url</label>
                <input type="password" placeholder="password"  className="form-control fontFamily1"/>
            </div>
        </div>
        <div  className="row">
            <div  className="col-md-12 form-group">
                <input onClick={update} type="submit"  className="btn btn-block btn-login" value="update" />
            </div>
        </div>
      
    </div>
    
    </div>
    
    <div  className="col-md-6">
        <div  className="simple-login-container textCenter">
    
            <input accept="image/*"  type='file' id="imgInp" />
      <img id="blah" src="#" className="blahImage1"/>
        </div>
        
    </div>
    </div>
    </div>
    );
    
}
 
export default Profile;