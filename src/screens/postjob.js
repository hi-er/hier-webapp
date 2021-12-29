import React from 'react';
import './dashboard.css';
class PostJob extends React.Component {
    render() { 
        return (
        
        <div>
       <div className="row">
    <div className="col-md-12">
      
    <img className="col-md-4 img" src="./assets/Logo.jpeg" />
            
            <span className="col-md-8 myJobsTxt">
                post a job</span>

      
    </div>
</div>

    <div className="row">
        <div className="col-md-6">
            
<div className="simple-login-container">

    <div className="row">
        <div className="col-md-12 form-group">
            <input type="text" className="form-control" placeholder="job title"/>
        </div>
    </div>
    <div className="row">
        <div className="col-md-12 form-group">
            <input type="text" className="form-control" placeholder="job location (postal code)"/>
        </div>
    </div>
    <div className="row">
        <div className="col-md-12 form-group">
            <input type="text" className="form-control" placeholder="maximum salary or hourly rate"/>
        </div>
    </div>
    <div className="row">
        <div className="col-md-12 form-group">
            <input type="text" className="form-control" placeholder="top skills required for this job"/>
        </div>
    </div>
    <div className="row">
        <div className="col-md-12 form-group">
            <input type="text" className="form-control" placeholder="close date"/>
        </div>
    </div>
    <div className="row">
        <div className="col-md-12 form-group">
            <input type="text" className="form-control" placeholder="link to job"/>
        </div>
    </div>
  

  
  
</div>

</div>

<div className="col-md-6">
    <div className="simple-login-container">
        <div className="row">
            <div className="col-md-12 form-group">
                <textarea rows="6" placeholder="job description" className="form-control"></textarea>
            </div>
        </div>
    </div>
</div>

  
</div>

        <input type="submit" className="btn btn-block btn-login submitButton"  value="post" />
  

        </div>
        );
    }
}
 
export default PostJob;