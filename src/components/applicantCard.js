import React, { useState, useEffect } from "react";
import "../screens/dashboard.css";
import PreferencesButton from "../components/prefrencesButton";
import SkillButton from "../components/skillButton";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getOpportunityByID,
  acceptApplicant,
  rejectApplicant,
} from "../firebase/firebase";
import { faThumbsUp, faFolderClosed } from "@fortawesome/free-solid-svg-icons";
import Loading from "react-fullscreen-loading";
function ApplicantCard(props){

    const applicant= props.applicantID;
   console.log("this is from inner component: ", props);

    return (
      <div></div>
    )
}
export default ApplicantCard;