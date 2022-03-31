import React from 'react';
function PreferencesButton(props) {
    const data= props.data;
        return (<div  className="col-md-2 preferencesButton">
        {data}
  </div>);
    
}
 
export default PreferencesButton;