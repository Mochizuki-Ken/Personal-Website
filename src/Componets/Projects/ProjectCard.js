import { useState } from "react"
import "./ProjectCard.css"
import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
export default function ProjectCard({

  ProjectInfo = {
    ProjectId:"",
    ProjectName:"",
    ProjectGitHubUrl:"",
    ProjectImageUrl:"",
    ProjectShortIntro:"",
    ProjectContent:"",
    ProjectTags:[""],
    ProjectDate:""
  }
  
  }) {

  return (
    <div className="ProjectCard_Main_Div">

      <div className="Left">

        {ProjectInfo.ProjectImageUrl!==""&&<img className="Image" width={100} height={100} sizes="" unoptimized alt="" src={ProjectInfo.ProjectImageUrl}/>}

      </div>

      <div className="Right">

        <label className="id">ID : {ProjectInfo.ProjectId}</label>

        <label className="Name">{ProjectInfo.ProjectName}</label>

        <label className="ShortInfo">{ProjectInfo.ProjectShortIntro}</label>

        <div className="Button_Div">

          <Link className="Link" to={`/projects/${ProjectInfo.ProjectId}`}>Details</Link>

          <a className="Link" onClick={()=>{window.open(ProjectInfo.ProjectGitHubUrl,"__blank")}} >Github<IoLogoGithub className="icon"/></a>

          <label className="Date">{ProjectInfo.ProjectDate}</label>

        </div>

        <div className="Tags_Div">
          {ProjectInfo.ProjectTags.map((Tag,Index)=>{
            return(
              <label key={Index} className="tag">#{Tag} </label>
            )
          })}
        </div>
        

      </div>
      
    </div>
  )
}
