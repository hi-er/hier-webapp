import React from "react";
function SkillButton(props) {
  const data = props.data;
  return <div className="col-md-5 skillsButton">{data}</div>;
}

export default SkillButton;
